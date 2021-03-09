import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PaginationOptionsInterface } from 'src/app/complements/interface/paginator.interface';
import { addressYsap } from 'src/models/model/ysap/addressYsap';
import { thirdWalletYsap } from 'src/models/model/ysap/thirdWalletYsap';
import { usersYsap } from 'src/models/model/ysap/userYsap';

@Injectable()
export class YsapAddressService { 
    constructor(
        @InjectModel(addressYsap)
        private readonly Model: typeof addressYsap,
        @InjectModel(usersYsap)
        private readonly UserModel: typeof usersYsap,
    ){}


async Create(data):Promise<addressYsap>{ 
    const user = data.usersId

    if(!user || user == null || user == ""){
        throw new Error("usuario desconocido")
    }


    const findUSer = await this.UserModel.findOne({where: {unique_id: user}})
    if(!findUSer || findUSer == null ){
        throw new Error("usuario no existe en la DB")
    }
    console.log(findUSer);
    

    data.usersId = findUSer.id
    
    const NewData = await this.Model.create(data); 
    if(!NewData || NewData == null ){
        throw new Error("no se pudo crear direccion")
    } 
    return NewData
}


async getAll(id, options: PaginationOptionsInterface): Promise<any>{
    const findUSer = await this.UserModel.findOne({where: {unique_id: id}})
    if(!findUSer || findUSer == null ){
        throw new Error("usuario no existe en la DB")
    }

    const {count, rows} = await this.Model.findAndCountAll({
    limit: options.limits,
    order: [['id', options.orden]],
    where: {usersId: findUSer.id},
    offset: options.pages, //@ts-ignore
    include: [thirdWalletYsap]
    });
 

    return {rows, count};
}
          



}
