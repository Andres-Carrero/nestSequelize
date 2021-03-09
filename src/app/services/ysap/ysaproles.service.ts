import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { rolesYsap } from 'src/models/model/ysap/rolesYsap';

@Injectable()
export class YsapRolesService {
    constructor(
        @InjectModel(rolesYsap)
        private readonly Model: typeof rolesYsap,
    ){}


    async Create(data){
        const newData = await this.Model.create(data)
        if(!newData){
            throw new Error("no crearon datos")
        }
        return newData 
    }


    
 }
