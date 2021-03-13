import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PaginationOptionsInterface } from 'src/app/complements/interface/paginator.interface';
import { statusYsap } from 'src/models/model/ysap/statusYsap';
import { usersYsap } from 'src/models/model/ysap/userYsap';
import { WalletsYsap } from 'src/models/model/ysap/walletsYsap';

@Injectable()
export class YsapWalletsService { 
    constructor(
        @InjectModel(WalletsYsap)
        private readonly Model: typeof WalletsYsap,
        @InjectModel(usersYsap)
        private readonly userModel: typeof usersYsap,
    ){}

    async createWallets(data):Promise<any>{
        const user = data.userId
         
        const findUser = await this.userModel.findOne({where:{unique_id: user} })      
        if(!findUser){
            throw new Error('Lo siente!! este usuario no fue encontrado')
        }

        data.statusId = 1
        data.userId = findUser.id

        const newWallet = await this.Model.create(data)
        return newWallet
    }


    async getAll(id, options: PaginationOptionsInterface): Promise<any>{
        const findUser = await this.userModel.findOne({where: {unique_id: id}  })
        if(!findUser){throw new Error("usuario no encontrado")}
 
        const {count, rows} = await this.Model.findAndCountAll({
        limit: options.limits,
        order: [['id', options.orden]],
        where: {userId: findUser.id},
        
        offset: options.pages, //@ts-ignore
        include: [statusYsap, usersYsap]
        });
     
        return {rows, count};
    }

    async update(id, body){
        const data = await this.Model.update(body, {where: {unique_id: id} })
        console.log(data);
        return data
        
    }


 }
