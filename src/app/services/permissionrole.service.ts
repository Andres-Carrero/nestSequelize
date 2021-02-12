import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { permission } from 'src/models/model/permission';
import { permissionRole } from 'src/models/model/relations/permissionRole';
import { roles } from 'src/models/model/role';
import * as buildPaginator from 'pagination-apis';
import { FilterWithPagination, PaginationOptionsInterface } from "src/app/complements/interface/paginator.interface";

@Injectable()
export class PermissionRoleService {
    constructor(
        @InjectModel(permission)
        private readonly permissionModel: typeof permission,
        @InjectModel(roles)
        private readonly roleModel: typeof roles,
        @InjectModel(permissionRole)
        private readonly permissionRoleModel: typeof permissionRole,
      ){}

    
      /*async getAll(options: PaginationOptionsInterface): Promise<FilterWithPagination>{
        const { page, limit, skip, paginate } = buildPaginator({limit: options.limits, page: options.pages});
        const {count, rows} = await this.permissionRoleModel.findAndCountAll({
        limit,
        offset: skip,
        where: {status: true},
        });
 
      return paginate(rows, count);
      }*/

      async getAll(){
        return await this.permissionRoleModel.findAll()
      }



    async findOne(permissionId){
      const findPermission = await this.permissionModel.findOne({where:{id: permissionId} }  )
      if (findPermission == null || !findPermission ){return [permissionId, 'no hay resultados']}

      const findUserRole = await this.permissionRoleModel.findAll({where: {permissionId: findPermission.id}}  )
      if (findUserRole == null || !findUserRole ){return [permissionId, 'no hay resultados']}

      return findUserRole
    }
  
  
    async Create(permissionId, roleId){
      const findPermission = await this.permissionModel.findOne({where:{id: permissionId} }  )
      if (findPermission == null || !findPermission ){return [permissionId, 'no hay resultados']}

      const findrole = await this.roleModel.findOne({where: {id: roleId}  } )
      if (findrole == null || !findrole ){return [roleId, 'no hay resultados']}

      const newPermissionRole = await this.permissionRoleModel.create({
        permissionId: findPermission.id,
        roleId: findrole.id
      });

      return [newPermissionRole, findPermission, findrole]
    }


    async update(permissionId, roleId):Promise<permissionRole[]>{
      const findPermission = await this.permissionModel.findOne({where:{id: permissionId} })
      if (findPermission == null || !findPermission ){return [permissionId, 'no hay resultados']}

      const findrole = await this.roleModel.findOne({where: {id: roleId}  } )
      if (findrole == null || !findrole ){return [roleId, 'no hay resultados']}
      
      await this.permissionRoleModel.destroy({where: {permissionId: findPermission.id}})
      const newPermissionRole = await this.permissionRoleModel.create({
        permissionId: findPermission.id,
        roleId: findrole.id
      });
     
      return [newPermissionRole]
    }
    

    async findAll():Promise<permissionRole[]>{
      const findPermissionRole = await this.permissionRoleModel.findAll()
      return findPermissionRole
    }


    async deleteAll(permissionId){
        const findPermission = await this.permissionModel.findOne({where:{id: permissionId} })
        if (findPermission == null || !findPermission ){return [permissionId, 'no hay resultados']}
        
        const deletes = await this.permissionRoleModel.destroy({where: {permissionId: findPermission.id}})    
        return deletes
      }
  

  
  }
