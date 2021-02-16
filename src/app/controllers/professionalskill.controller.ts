import { Controller, ParseIntPipe, Param, Post, Get, Put, Request, Delete } from '@nestjs/common';
import { ProfessionalskillService } from '../services/professionalskill.service';

@Controller('professionalSkill')
export class ProfessionalskillController {
    constructor(private services: ProfessionalskillService){}


    @Post(':professionalId/:TypeSkillId')
    async Create(
      @Param('professionalId', ParseIntPipe) professionalId: number,
      @Param('TypeSkillId', ParseIntPipe) TypeSkillId: number,
    ){    
      return this.services.Create(professionalId, TypeSkillId);
    }


    @Get(':professionalId')
    findByUuid(@Param('professionalId') professionalId:number){
 
      
        return this.services.findOne(professionalId);
    }

    
    @Put(':professionalId/:TypeSkillId')
    async Update(
      @Param('professionalId', ParseIntPipe) professionalId: number,
      @Param('TypeSkillId', ParseIntPipe) TypeSkillId: number,
    ){ 
      return this.services.update(professionalId, TypeSkillId);
    }


    @Get()
    async index(@Request() request){
        const datas = await this.services.getAll({
            limits: request.query.hasOwnProperty('limits') ? request.query.limits : 5,
            pages: request.query.hasOwnProperty('pages') ? request.query.pages : 0,
          });

      return datas
    }


    @Delete(':professionalId')
    async deleteAll(@Param('professionalId', ParseIntPipe) professionalId: number){
      return this.services.deleteAll(professionalId);
    }

 
}
