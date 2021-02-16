import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Crew } from 'src/models/model/crew';
import { professionals } from 'src/models/model/professionals';
import { crewProfessional } from 'src/models/model/relations/crewProfessional';
import { PaginationOptionsInterface } from '../complements/interface/paginator.interface';

@Injectable()
export class CrewProfessionalService {
    constructor(
        @InjectModel(professionals)
        private readonly professionalsModel: typeof professionals,
        @InjectModel(Crew)
        private readonly crewModel: typeof Crew,
        @InjectModel(crewProfessional)
        private readonly crewProfessionalModel: typeof crewProfessional,
      ){}

      async getAll(options: PaginationOptionsInterface): Promise<any>{
        const {count, rows} = await this.crewProfessionalModel.findAndCountAll({
        limit: options.limits,
        offset: options.pages,
        });
 
      return {rows, count};
      }


    async findOne(professionId){
      const finduser = await this.professionalsModel.findOne({where:{id: professionId} }  )
      if (finduser == null || !finduser ){return [professionId, 'no hay resultados']}

      const findUserRole = await this.crewProfessionalModel.findAll({where: {professionId: finduser.id}}  )
      if (findUserRole == null || !findUserRole ){return [professionId, 'no hay resultados']}

      return findUserRole
    }
  
  
    async Create(professionId, crewId){
      const finduser = await this.professionalsModel.findOne({where:{id: professionId} }  )
      if (finduser == null || !finduser ){return [professionId, 'no hay resultados']}

      const findbusiness = await this.crewModel.findOne({where: {id: crewId}  } )
      if (findbusiness == null || !findbusiness ){return [crewId, 'no hay resultados']}

      const newUserRole = await this.crewProfessionalModel.create({
        professionId: finduser.id,
        crewId: findbusiness.id
      });

      return [newUserRole, finduser, findbusiness]
    }


    async update(professionId, crewId){
      const finduser = await this.professionalsModel.findOne({where:{id: professionId} })
      if (finduser == null || !finduser ){return [professionId, 'no hay resultados']}
        console.log(finduser);
        
    
      const findbusiness = await this.crewModel.findOne({where: {id: crewId}  } )
      if (findbusiness == null || !findbusiness ){return [crewId, 'no hay resultados']}
      console.log(findbusiness);
      
      
      await this.crewProfessionalModel.destroy({where: {professionId: finduser.id}})
      const newUserbussiness = await this.crewProfessionalModel.create({
        professionId: finduser.id,
        crewId: findbusiness.id
      });
     
      return newUserbussiness
    }
    

    async findAll(){
      const findUserbusiness= await this.crewProfessionalModel.findAll()
      return findUserbusiness
    }


    async deleteAll(professionId){
      const finduser = await this.professionalsModel.findOne({where:{id: professionId} })
      if (finduser == null || !finduser ){return [professionId, 'no hay resultados']}
      
      const deletes = await this.crewProfessionalModel.destroy({where: {professionId: finduser.id}})    
      return deletes
    }
 
  
}
  
