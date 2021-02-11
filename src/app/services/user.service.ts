import { Injectable, NotFoundException,  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { configUsers } from 'src/models/model/configUser';
import { users } from "src/models/model/user";


@Injectable()
export class UserService {
    constructor(
      @InjectModel(users)
      private readonly userModel: typeof users,
      @InjectModel(configUsers)
      private readonly configModel: typeof configUsers,
      ){}
          
    /*async paginate(options: PaginationOptionsInterface,):Promise<Pagination<users>> {
        const [results, total] = await this.userModel.findAndCount({where: {state: true},
          take: options.limit,
          skip: options.page, 
        });
        //console.log(this.usersEntity.manager.save(results));
        
        return new Pagination<users>({
          results,
          total,
        });
      }*/
  
  
    async uuidUser(id):Promise<users[]>{
      const findiduser = await this.userModel.findOne({where:{id}})
      if (findiduser == null){
        throw new NotFoundException('No hay resultados')
      }
      return [findiduser]
    }
    

    async CreateUsers(user):Promise<users>{
      const newUser = await this.userModel.create(user);
      return newUser
    }
          
  
    async UpdateUsers(id, user ):Promise<users[]>{
      const update = await this.userModel.update(user, {where: {id}})
      return user
    }
          
  
    async deleteUsers(id,  user):Promise<users[]>{
      const userdelete = await this.userModel.update( user, {where: {id}})
      return [id, user]
    }
  
  
  
  
  }
  