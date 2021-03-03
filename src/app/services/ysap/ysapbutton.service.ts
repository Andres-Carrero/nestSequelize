import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PaginationOptionsInterface } from 'src/app/complements/interface/paginator.interface';
import { buttonYsap } from 'src/models/model/ysap/buttonYsap';
import { usersYsap } from 'src/models/model/ysap/userYsap';
import * as moment from "moment";
import { v4 as uuidv4 } from 'uuid';



@Injectable()
export class YsapButtonService { 
    constructor(
        @InjectModel(buttonYsap)
        private readonly Model: typeof buttonYsap,
        @InjectModel(usersYsap)
        private readonly userModel: typeof usersYsap
    ){}


async Create(head, data):Promise<any>{
    const headers = head.apikey

    if (headers == null || 
        headers == undefined || 
        headers == ""){
        throw new Error("apiKey undefined")
    }
    
    const findApiKey = await this.userModel.findOne({where: {apikey: headers}})
    if (!findApiKey){
        throw new Error("apiKey no encontrado")
    }

    data.unique_id = uuidv4()
    data.createdAt = new Date
    data.duration = moment(data.createdAt).add(10, "minutes")
    data.txId = findApiKey.id
    
    const NewData = await this.Model.create(data); //@ts-ignore
    const a = await this.Model.findOne({ where: {unique_id: NewData.unique_id}, include: [usersYsap]  })
    const nameUserV1 = a.Users.name.split(" ").join("")

    const redirect = `http://localhost:4200/YsapCheckout/${a.unique_id}`
    const success = `Success:${a.unique_id}`
    const cancel = `Cancel:${a.unique_id}`

    return  {redirect: redirect, Success: success, cancel: cancel, paymentBody: a}
}


async Update(id, data ):Promise<any>{
    const update = await this.Model.update(data, {where: {unique_id: id}})
    return update
}



async findById(id):Promise<any>{   //@ts-ignore
    const findid = await this.Model.findOne({   where: {unique_id: id}, include: [usersYsap] })

    if (findid == null || !findid){
        throw new Error("Pago no encontrado")
    }

    const success = `Success:${findid.unique_id}`
    const cancel = `Cancel:${findid.unique_id}`
    
     return {body: findid, Success: success, Cancel: cancel}
}



async getAll(options: PaginationOptionsInterface): Promise<any>{
    const {count, rows} = await this.Model.findAndCountAll({
    limit: options.limits,
    order: [['id', options.orden]],
    offset: options.pages,
    });
 

    return {rows, count};
}
          



}