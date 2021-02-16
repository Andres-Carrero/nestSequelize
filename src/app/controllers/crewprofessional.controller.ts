import { Controller, Post, Get, Param, Delete, Put, Body, ParseIntPipe, Request } from '@nestjs/common';
import { crewProfessionalDto } from '../complements/dto/crewProfessional.dto';
import { CrewProfessionalService } from '../services/crewprofessional.service';

@Controller('crewProfessional')
export class CrewProfessionalController {
    constructor(private services: CrewProfessionalService){}


    @Post(':professionId/:crewId')
    async Create(
      @Param('professionId', ParseIntPipe) professionId: number,
      @Param('crewId', ParseIntPipe) crewId: number,
      @Body() data: crewProfessionalDto
    ){    
      return this.services.Create(professionId, crewId, data);
    }


    @Get(':professionId')
    findByUuid(@Param('professionId') professionId:number){
 
      
        return this.services.findOne(professionId);
    }

    
    @Put(':professionId/:crewId')
    async Update(
      @Param('professionId', ParseIntPipe) professionId: number,
      @Param('crewId', ParseIntPipe) crewId: number,
      @Body() data: crewProfessionalDto
    ){ 
      return this.services.update(professionId, crewId, data);
    }


    @Get()
    async index(@Request() request){
        const datas = await this.services.getAll({
            limits: request.query.hasOwnProperty('limits') ? request.query.limits : 5,
            pages: request.query.hasOwnProperty('pages') ? request.query.pages : 0,
          });

      return datas
    }


    @Delete(':professionId')
    async deleteAll(@Param('professionId', ParseIntPipe) professionId: number){
      return this.services.deleteAll(professionId);
    }

 
}
