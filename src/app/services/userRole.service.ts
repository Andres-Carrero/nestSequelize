import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { roles } from 'src/models/model/role';
import { users } from 'src/models/model/user';
import { userRole } from 'src/models/model/relations/userRole';

@Injectable()
export class UserRoleService {
    constructor(
        @InjectModel(users)
        private readonly userModel: typeof users,
        @InjectModel(roles)
        private readonly roleModel: typeof roles,
        @InjectModel(userRole)
        private readonly userRoleModel: typeof userRole,

      ){}

      async findAll():Promise<userRole[]>{
        const findUserRole = await this.userRoleModel.findAll()
        return findUserRole
      }



    async findOne(userId){
      const finduser = await this.userModel.findOne({where:{id: userId} }  )
      if (finduser == null || !finduser ){return [userId, 'no hay resultados']}

      const findUserRole = await this.userRoleModel.findAll({where: {userId: finduser.id}}  )
      if (findUserRole == null || !findUserRole ){return [userId, 'no hay resultados']}

      return findUserRole
    }
  
  
    async Create(userId, roleId){
      const finduser = await this.userModel.findOne({where:{id: userId} }  )
      if (finduser == null || !finduser ){return [userId, 'no hay resultados']}

      const findrole = await this.roleModel.findOne({where: {id: roleId}  } )
      if (findrole == null || !findrole ){return [roleId, 'no hay resultados']}

      const newUserRole = await this.userRoleModel.create({
        userId: finduser.id,
        roleId: findrole.id
      });

      return [newUserRole, finduser, findrole]
    }


    async update(userId, roleId):Promise<userRole[]>{
      const finduser = await this.userModel.findOne({where:{id: userId} })
      if (finduser == null || !finduser ){return [userId, 'no hay resultados']}

      const findrole = await this.roleModel.findOne({where: {id: roleId}  } )
      if (findrole == null || !findrole ){return [roleId, 'no hay resultados']}
      
      await this.userRoleModel.destroy({where: {userId: finduser.id}})
      const newUserRole = await this.userRoleModel.create({
        userId: finduser.id,
        roleId: findrole.id
      });
     
      return [newUserRole]
    }


    async deleteAll(userId){
      const finduser = await this.userModel.findOne({where:{id: userId} })
      if (finduser == null || !finduser ){return [userId, 'no hay resultados']}
      
      const deletes = await this.userRoleModel.destroy({where: {userId: finduser.id}})    
      return deletes
    }
 
  
}
  