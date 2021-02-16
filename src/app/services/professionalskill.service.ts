import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { professionals } from 'src/models/model/professionals';
import { professionalSkill } from 'src/models/model/relations/professionalSkill';
import { TypeSkills } from 'src/models/model/typeSkills';
import { PaginationOptionsInterface } from '../complements/interface/paginator.interface';

@Injectable()
export class ProfessionalskillService {
    constructor(
        @InjectModel(professionals)
        private readonly professionalsModel: typeof professionals,
        @InjectModel(TypeSkills)
        private readonly TypeSkillsModel: typeof TypeSkills,
        @InjectModel(professionalSkill)
        private readonly professionalSkillModel: typeof professionalSkill,
      ){}

      async getAll(options: PaginationOptionsInterface): Promise<any>{
        const {count, rows} = await this.professionalSkillModel.findAndCountAll({
        limit: options.limits,
        offset: options.pages,
        });
 
      return {rows, count};
      }


    async findOne(professionalId){
      const finduser = await this.professionalsModel.findOne({where:{id: professionalId} }  )
      if (finduser == null || !finduser ){return [professionalId, 'no hay resultados']}

      const findUserRole = await this.professionalSkillModel.findAll({where: {professionalId: finduser.id}}  )
      if (findUserRole == null || !findUserRole ){return [professionalId, 'no hay resultados']}

      return findUserRole
    }
  
  
    async Create(professionalId, TypeSkillId){
      const finduser = await this.professionalsModel.findOne({where:{id: professionalId} }  )
      if (finduser == null || !finduser ){return [professionalId, 'no hay resultados']}

      const findbusiness = await this.TypeSkillsModel.findOne({where: {id: TypeSkillId}  } )
      if (findbusiness == null || !findbusiness ){return [TypeSkillId, 'no hay resultados']}

      const newUserRole = await this.professionalSkillModel.create({
        professionalId: finduser.id,
        TypeSkillId: findbusiness.id
      });

      return [newUserRole, finduser, findbusiness]
    }


    async update(professionalId, TypeSkillId){
      const finduser = await this.professionalsModel.findOne({where:{id: professionalId} })
      if (finduser == null || !finduser ){return [professionalId, 'no hay resultados']}
        console.log(finduser);
        
    
      const findbusiness = await this.TypeSkillsModel.findOne({where: {id: TypeSkillId}  } )
      if (findbusiness == null || !findbusiness ){return [TypeSkillId, 'no hay resultados']}
      console.log(findbusiness);
      
      
      await this.professionalSkillModel.destroy({where: {professionalId: finduser.id}})
      const newUserbussiness = await this.professionalSkillModel.create({
        professionalId: finduser.id,
        TypeSkillId: findbusiness.id
      });
     
      return newUserbussiness
    }
    

    async findAll(){
      const findUserbusiness= await this.professionalSkillModel.findAll()
      return findUserbusiness
    }


    async deleteAll(professionalId){
      const finduser = await this.professionalsModel.findOne({where:{id: professionalId} })
      if (finduser == null || !finduser ){return [professionalId, 'no hay resultados']}
      
      const deletes = await this.professionalSkillModel.destroy({where: {professionalId: finduser.id}})    
      return deletes
    }
 
  
}
  
