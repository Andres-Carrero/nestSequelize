import { Injectable, NotFoundException,  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { configUsers } from 'src/models/model/configUser';
import { users } from "src/models/model/user";
import * as buildPaginator from 'pagination-apis';
import { FilterWithPagination, PaginationOptionsInterface } from "src/app/complements/interface/paginator.interface";
import { roles } from 'src/models/model/role';
import { businessUnit } from 'src/models/model/businessUnit';



@Injectable()
export class UserService {
    constructor(
      @InjectModel(users)
      private readonly userModel:typeof users,
      @InjectModel(configUsers)
      private readonly configModel:typeof configUsers,

      ){}

    

      async getAll(options: PaginationOptionsInterface): Promise<FilterWithPagination>{

        const { page, limit, skip, paginate } = buildPaginator({limit: options.limits, page: options.pages});
              

        const {count, rows} = await this.userModel.findAndCountAll({
        limit,
        offset: skip,
        where: {status: true},
        //@ts-ignore
        include: [configUsers, roles, businessUnit] 
        });
 
      return paginate(rows, count);
      }


    
     
  
    async uuidUser(id):Promise<users[]>{
      console.log(id);
      
      //@ts-ignore
      const findiduser = await this.userModel.findOne({where:{unique_id: id}, include: [configUsers, roles, businessUnit]  })
      if (findiduser == null){
        throw new NotFoundException('No hay resultados')
      }
      return [findiduser]
    }
    

    async CreateUsers(user):Promise<users>{

      //@ts-ignore
      const newUser = await this.userModel.create(user);
      return newUser
    }
          
  
    async UpdateUsers(id, user ):Promise<users[]>{
      const update = await this.userModel.update(user, {where: {unique_id: id}})
      return user
    }
          
  
    async deleteUsers(id,  user):Promise<users[]>{
      const userdelete = await this.userModel.update( user, {where: {unique_id: id}})
      return [id, user, userdelete]
    }
  
  
  
  
  }
  