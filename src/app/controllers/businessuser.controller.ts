import { Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request } from '@nestjs/common';
import { permissionRole } from 'src/models/model/relations/permissionRole';
import { BusinessUserService } from '../services/businessuser.service';

@Controller('usersBusiness')
export class BusinessUserController {
    constructor(private services: BusinessUserService){}


    @Post(':userId/:businessId')
    async Create(
      @Param('userId', ParseIntPipe) userId: number,
      @Param('businessId', ParseIntPipe) businessId: number,
    ){    
      return this.services.Create(userId, businessId);
    }


    @Get(':userId')
    findByUuid(@Param('userId') userId:number){
        return this.services.findOne(userId);
    }

    
    @Put(':userId/:businessId')
    async Update(
      @Param('userId', ParseIntPipe) userId: number,
      @Param('businessId', ParseIntPipe) businessId: number,
    ){ 
      return this.services.update(userId, businessId);
    }


    @Get()
    async index(@Request() request){
        const datas = await this.services.getAll({
            limits: request.query.hasOwnProperty('limits') ? request.query.limits : 5,
            pages: request.query.hasOwnProperty('pages') ? request.query.pages : 0,
            orden: request.query.hasOwnProperty('orden') ? request.query.orden : 'ASC',
            columns: request.query.columns,
            filter: request.query.filter

          });

      return datas
    }



    @Delete(':userId')
    async deleteAll(@Param('userId', ParseIntPipe) userId: number){
      return this.services.deleteAll(userId);
    }

 
}
