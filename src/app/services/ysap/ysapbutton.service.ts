import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PaginationOptionsInterface } from 'src/app/complements/interface/paginator.interface';
import { buttonYsap } from 'src/models/model/ysap/buttonYsap';
import { usersYsap } from 'src/models/model/ysap/userYsap';
import * as moment from "moment";
import { v4 as uuidv4 } from 'uuid';
import { statusYsap } from 'src/models/model/ysap/statusYsap';
import { addressYsap } from 'src/models/model/ysap/addressYsap';
import { buttonsGenerateYsap } from 'src/models/model/ysap/buttonsYsap';
import { BoxYsap } from 'src/models/model/ysap/boxYsap';
import {Op} from "sequelize";



@Injectable()
export class YsapButtonService { 
    NewData: any = []
    constructor(
        @InjectModel(buttonYsap)
        private readonly Model: typeof buttonYsap,
        @InjectModel(usersYsap)
        private readonly userModel: typeof usersYsap,
        @InjectModel(addressYsap)
        private readonly addressModel: typeof addressYsap,
        @InjectModel(buttonsGenerateYsap)
        private readonly buttonModel: typeof buttonsGenerateYsap,
    ){}
 
    
async Create(data):Promise<any>{
    const address = data.addressId
    const headers = data.apikey
    const button = data.buttonId
    //const box = data.boxId

    if (headers == null || 
        headers == undefined || 
        headers == ""){
        throw new Error("apiKey no valido")
    }
    if (address == null || 
        address == undefined || 
        address == ""){
        throw new Error("direccion no valida")
    }
    if (button == null || 
        button == undefined || 
        button == ""){
        throw new Error("boton no valida")
    }



    const findbuttons = await this.buttonModel.findOne({where: {unique_id: button} })
    if (!findbuttons || findbuttons.statusId == 3){
        throw new Error("button no encontrado")
    }
    const findAddress = await this.addressModel.findOne({where: {unique_id: address}})
    if (!findAddress || findAddress.status == false){
        throw new Error("direccion no encontrado")
    }
  //@ts-ignore
    const findApiKey = await this.userModel.findOne({where: {apikey: headers}, include: [addressYsap, buttonYsap, buttonsGenerateYsap, BoxYsap] })
    if (!findApiKey || findApiKey.statusId == 3){
        throw new Error("apiKey no encontrado")
    }    

    
    const findButton = findApiKey.buttons //@ts-ignore
    for (let index = 0; index < findButton.length; index++) {
        const element = findButton[index];

        if(findbuttons.id == element.id){    
        const findBox = findApiKey.box //@ts-ignore
        const addressfind = findApiKey.address //@ts-ignore

            for (let x = 0; x < addressfind.length; x++) {
                const addressIndex = addressfind[x];
 
                if(findAddress.id === addressIndex.id){

                    data.unique_id = uuidv4()
                    data.statusId = 1
                    data.createdAt = moment.utc(new Date)//(moment().format("DD/MM/YYYY HH:mm:ss"))
                    data.duration = moment(data.createdAt).add(10, "minutes")
                    data.txId = findApiKey.id
                    data.addressId = findAddress.id
                    data.buttonId = findbuttons.id
                                
                    const NewData = await this.Model.create(data); 
                    if (!NewData || NewData.unique_id == undefined){
                        throw new Error("el pago no se logro realizar")
                    }    
        
                    const redirect = `http://localhost:4200/YsapCheckout/${NewData.unique_id}`
                    const success = `Success:${NewData.unique_id}`
                    const cancel = `Cancel:${NewData.unique_id}`
                            
                    return  {redirect: redirect, Success: success, cancel: cancel, paymentBody: NewData} 

                } 
            }
            throw new Error("direccion no valida para este usuario")

        }     
    }
    throw new Error("boton no valido para este usuario")
}


async Update(id, data ):Promise<any>{
    const update = await this.Model.update(data, {where: {unique_id: id}})
    return update
}



async findById(id):Promise<any>{   //@ts-ignore

    
    const findid = await this.Model.findOne({   where: {unique_id: id}, include: [usersYsap, addressYsap, buttonsGenerateYsap] })

    if (findid == null || !findid){
        throw new Error("Pago no encontrado")
    }

    const success = `Success:${findid.unique_id}`
    const cancel = `Cancel:${findid.unique_id}`
    
     return {body: findid, Success: success, Cancel: cancel}
}



async getAll(id, options: PaginationOptionsInterface): Promise<any>{   
    const Filters = options.filter
    const DateStart = options.filter.dateStart 
    const DateEnd = options.filter.dateEnd
    const status = options.filter.status
    let where = {}

        if(!Filters.status){
            where = {txId: id}   
        }

        if(!Filters.dateStart){
            where = {txId: id}   
        }
        if(!Filters.dateEnd){
            where = {txId: id}   
        }

        if(Filters.status){
            if(Filters.status == 4){
                where = {txId: id}   
            }
            if( Filters.status == 1 || 
                Filters.status == 2 || 
                Filters.status == 3){  
                    where = {
                        txId: id, 
                        statusId: status
                    }   
            }
        }


        if(Filters.dateStart){

            if(!Filters.dateEnd){   
                where = {txId: id}   
            }

            if(Filters.dateEnd){    
                where = {
                    txId: id, 
                    createdAt: {[Op.between]:[DateStart, DateEnd]} 
                }     
            }

            if(Filters.status){

                if(Filters.status == 4){
                    where = {
                        txId: id,
                        createdAt: {[Op.between]:[DateStart, DateEnd]}  
                    }     
                }

                if( Filters.status == 1 || 
                    Filters.status == 2 || 
                    Filters.status == 3){   
                        where = {   
                            txId: id, 
                            statusId: status, 
                            createdAt: { [Op.between]: [DateStart, DateEnd] }  
                        }
                }

            }
        }



    const {count, rows} = await this.Model.findAndCountAll({
    where,  //@ts-ignore
    include: [{model: statusYsap, attributes: ['name']}, {model:buttonsGenerateYsap},{model: addressYsap}],
    });
 

    return {rows, count};
}
          



}