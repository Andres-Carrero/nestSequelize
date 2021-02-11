import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { roles } from 'src/models/model/role';
import { users } from 'src/models/model/user';
import { userRole } from 'src/models/model/userRole';

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
  
  
  
    async setRoleToUser(userId, roleId) {
        const user = 5
        const role = 1

        const roles = [userId = user, roleId = role]

        const newUser = await this.userRoleModel.create(roles);
        console.log(newUser);
        
        return newUser
        /*console.log(userId);
        console.log(roleId);
        
        
      const userExist = await this.userModel.findOne({where: {id: userId}});
      const roleExist = await this.roleModel.findOne({where: {id: roleId}});
        console.log(userExist);
        console.log(roleExist);
        
  
      if (!roleExist){ throw new NotFoundException('Role not exist: ' + roleId)  }
      if (!userExist){ throw new NotFoundException('user not exist: ' + userId)  }

      userExist. = [
        roleExist,
      ]
        
      const newRole = await this.userRoleModel.create(roleId, userId);
      console.log(newRole);
      
      return [newRole,'Relacion creada con exito']*/

    }
  
  
  
  
  
  
  
  }
  