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



@Injectable()
export class YsapButtonService { 
    constructor(
        @InjectModel(buttonYsap)
        private readonly Model: typeof buttonYsap,
        @InjectModel(usersYsap)
        private readonly userModel: typeof usersYsap,
        @InjectModel(addressYsap)
        private readonly addressModel: typeof addressYsap,
        @InjectModel(buttonsGenerateYsap)
        private readonly buttonModel: typeof buttonsGenerateYsap

    ){}
 
    
async Create(data):Promise<any>{
    
    const address = data.addressId
    const headers = data.apikey
    const button = data.buttonId

    if (headers == null || 
        headers == undefined || 
        headers == ""){
        throw new Error("apiKey no valido")
    }
    if (address == null || 
        address == undefined || 
        address == ""){
        throw new Error("addressId no valida")
    }
    if (button == null || 
        button == undefined || 
        button == ""){
        throw new Error("addressId no valida")
    }
    const buttons = await this.buttonModel.findOne({where: {id: button} })
    if (!buttons || buttons.statusId == 3){
        throw new Error("apiKey no encontrado")
    }

    //@ts-ignore
    const findApiKey = await this.userModel.findOne({where: {apikey: headers}, 
        include: [buttonsGenerateYsap, buttonYsap] })
    
        const findButton = findApiKey.buttons
    
    
       /* for (let index = 0; index < findButton[length] ; index++) {
            console.log(findButton);
            
        }*/



    
    if (!findApiKey || findApiKey.status == false){
        throw new Error("apiKey no encontrado")
    }

   

    const findAddress = await this.addressModel.findOne({where: {id: address}})
    if (!findAddress || findAddress.status == false){
        throw new Error("addressId no encontrado")
    }

    data.unique_id = uuidv4()
    data.statusId = 1
    data.createdAt = new Date
    data.duration = moment(data.createdAt).add(10, "minutes")
    data.txId = findApiKey.id
    data.addressId = findAddress.id
    
    const NewData = await this.Model.create(data); //@ts-ignore
    if (!NewData){
        throw new Error("el pago no se logro realizar")
    }

    const redirect = `http://localhost:4200/YsapCheckout/${NewData.unique_id}`
    const success = `Success:${NewData.unique_id}`
    const cancel = `Cancel:${NewData.unique_id}`

    return  {redirect: redirect, Success: success, cancel: cancel, paymentBody: NewData}
}


async Update(id, data ):Promise<any>{
    const update = await this.Model.update(data, {where: {unique_id: id}})
    return update
}



async findById(id):Promise<any>{   //@ts-ignore
    const findid = await this.Model.findOne({   where: {unique_id: id}, include: [usersYsap, addressYsap] })

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