import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuidv4 } from 'uuid';
import * as moment from "moment";


import { buttonsGenerateYsap } from 'src/models/model/ysap/buttonsYsap';
import { usersYsap } from 'src/models/model/ysap/userYsap';
import { addressYsap } from 'src/models/model/ysap/addressYsap';
import { PaginationOptionsInterface } from 'src/app/complements/interface/paginator.interface';
import { statusYsap } from 'src/models/model/ysap/statusYsap';
import { buttonYsap } from 'src/models/model/ysap/buttonYsap';

@Injectable()
export class ButtonGenerateService {
    constructor(
        @InjectModel(buttonsGenerateYsap)
        private readonly Model: typeof buttonsGenerateYsap,
        @InjectModel(usersYsap)
        private readonly userModel: typeof usersYsap,
        @InjectModel(addressYsap)
        private readonly addressModel: typeof addressYsap

    ){}



 
    async Create(data):Promise<any>{
        console.log(data);
        
        const address = data.addressId
        const users = data.userId
    
        if (users == null || 
            users == undefined || 
            users == ""){
            throw new Error("Usuario no valido")
        }
        if (address == null || 
            address == undefined || 
            address == ""){
            throw new Error("Direccion no valida")
        }
        
        //@ts-ignore
        const findUser = await this.userModel.findOne({where: {id: users}, include: [buttonsGenerateYsap, buttonYsap] })
        if (!findUser || findUser.status == false){
            throw new Error("Usuario no encontrado")
        }
    
        const findAddress = await this.addressModel.findOne({where: {id: address}})
        if (!findAddress || findAddress.status == false){
            throw new Error("Direccion no encontrado")
        }
    
        data.statusId = 1
        data.createdAt = new Date
        data.duration = moment(data.createdAt).add(10, "minutes")
        data.userId = findUser.id
        data.addressId = findAddress.id
        data.unique_id = uuidv4()

        const NewData = await this.Model.create(data); //@ts-ignore
        if (!NewData){
            throw new Error("el pago no se logro realizar")
        }

        return  NewData
    }

    
    async getAll(id, options: PaginationOptionsInterface): Promise<any>{
        const {count, rows} = await this.Model.findAndCountAll({
        limit: options.limits,
        order: [['id', options.orden]],
        where: {userId: id},
        offset: options.pages, //@ts-ignore
        include: [addressYsap, usersYsap, statusYsap, buttonYsap]
        });
     
    
        return {rows, count};
    }


    async update(id, body){
        const data = await this.Model.update(body, {where: {unique_id: id} })
        console.log(data);
        return data
        
    }





 }
