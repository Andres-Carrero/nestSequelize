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
        @InjectModel(BoxYsap)
        private readonly boxModel: typeof BoxYsap

    ){}
 
    
async Create(data):Promise<any>{
    const address = data.addressId
    const headers = data.apikey
    const button = data.buttonId
    const box = data.boxId

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
    if (box == null || 
        box == undefined || 
        box == ""){
        throw new Error("caja no valida")
    }


    const findbuttons = await this.buttonModel.findOne({where: {id: button} })
    if (!findbuttons || findbuttons.statusId == 3){
        throw new Error("button no encontrado")
    }
    const findAddress = await this.addressModel.findOne({where: {id: address}})
    if (!findAddress || findAddress.status == false){
        throw new Error("direccion no encontrado")
    }
    const findBoxs = await this.boxModel.findOne({where: {id: box}  })
    if (!findBoxs || findBoxs.statusId == 3){
        throw new Error("caja registradora no encontrada")
    }   //@ts-ignore
    const findApiKey = await this.userModel.findOne({where: {apikey: headers}, include: [addressYsap, buttonYsap, buttonsGenerateYsap, BoxYsap] })
    if (!findApiKey || findApiKey.statusId == 3){
        throw new Error("apiKey no encontrado")
    }    

    
    const findButton = findApiKey.buttons //@ts-ignore
    for (let index = 0; index < findButton.length; index++) {
        const element = findButton[index];

        if(findbuttons.id == element.id){    
        const findBox = findApiKey.box //@ts-ignore

            for (let i = 0; i < findBox.length; i++) {
             const boxIndex = findBox[i];

                if(findBoxs.id === boxIndex.id){
                    const addressfind = findApiKey.address //@ts-ignore

                    for (let x = 0; x < addressfind.length; x++) {
                        const addressIndex = addressfind[x];
 
                        if(findAddress.id === addressIndex.id){

                            data.unique_id = uuidv4()
                            data.statusId = 1
                            data.createdAt = new Date
                            data.duration = moment(data.createdAt).add(10, "minutes")
                            data.txId = findApiKey.id
                            data.addressId = findAddress.id
                            data.boxId = findBoxs.id
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
            throw new Error("caja no valida para este usuario")
        }     
    }
    throw new Error("boton no valido para este usuario")
}


async Update(id, data ):Promise<any>{
    const update = await this.Model.update(data, {where: {unique_id: id}})
    return update
}



async findById(id):Promise<any>{   //@ts-ignore

    
    const findid = await this.Model.findOne({   where: {unique_id: id}, include: [usersYsap, addressYsap, BoxYsap, buttonsGenerateYsap] })

    if (findid == null || !findid){
        throw new Error("Pago no encontrado")
    }

    const success = `Success:${findid.unique_id}`
    const cancel = `Cancel:${findid.unique_id}`
    
     return {body: findid, Success: success, Cancel: cancel}
}



async getAll(id, options: PaginationOptionsInterface): Promise<any>{
    
    const {count, rows} = await this.Model.findAndCountAll({
    limit: options.limits,
    order: [['id', options.orden]],
    offset: options.pages, //@ts-ignore
    include: [{model: statusYsap, attributes: ['name']}, {model: addressYsap}],
    where: {txId: id, statusId: 1,}
    });
 

    return {rows, count};
}
          



}