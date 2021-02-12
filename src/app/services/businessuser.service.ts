import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { businessUnit } from 'src/models/model/businessUnit';
import { businessUser } from 'src/models/model/relations/businessUser';
import { permissionRole } from 'src/models/model/relations/permissionRole';
import { users } from 'src/models/model/user';

@Injectable()
export class BusinessUserService {
    constructor(
        @InjectModel(users)
        private readonly userModel: typeof users,
        @InjectModel(businessUnit)
        private readonly businessModel: typeof businessUnit,
        @InjectModel(businessUser)
        private readonly userBusinessModel: typeof businessUser,
      ){}


    async findOne(userId){
      const finduser = await this.userModel.findOne({where:{id: userId} }  )
      if (finduser == null || !finduser ){return [userId, 'no hay resultados']}

      const findUserRole = await this.userBusinessModel.findAll({where: {userId: finduser.id}}  )
      if (findUserRole == null || !findUserRole ){return [userId, 'no hay resultados']}

      return findUserRole
    }
  
  
    async Create(userId, businessId){
      const finduser = await this.userModel.findOne({where:{id: userId} }  )
      if (finduser == null || !finduser ){return [userId, 'no hay resultados']}

      const findbusiness = await this.businessModel.findOne({where: {id: businessId}  } )
      if (findbusiness == null || !findbusiness ){return [businessId, 'no hay resultados']}

      const newUserRole = await this.userBusinessModel.create({
        userId: finduser.id,
        businessId: findbusiness.id
      });

      return [newUserRole, finduser, findbusiness]
    }


    async update(userId, businessId){
      const finduser = await this.userModel.findOne({where:{id: userId} })
      if (finduser == null || !finduser ){return [userId, 'no hay resultados']}
        console.log(finduser);
        
    
      const findbusiness = await this.businessModel.findOne({where: {id: businessId}  } )
      if (findbusiness == null || !findbusiness ){return [businessId, 'no hay resultados']}
      console.log(findbusiness);
      
      
      await this.userBusinessModel.destroy({where: {userId: finduser.id}})
      const newUserbussiness = await this.userBusinessModel.create({
        userId: finduser.id,
        businessId: findbusiness.id
      });
     
      return newUserbussiness
    }
    

    async findAll(){
      const findUserbusiness= await this.userBusinessModel.findAll()
      return findUserbusiness
    }


    async deleteAll(userId){
      const finduser = await this.userModel.findOne({where:{id: userId} })
      if (finduser == null || !finduser ){return [userId, 'no hay resultados']}
      
      const deletes = await this.userBusinessModel.destroy({where: {userId: finduser.id}})    
      return deletes
    }
 
  
}
  
