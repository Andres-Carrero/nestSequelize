import { Controller, Get, Post, Put, Delete, Param, Body, Response, Request } from '@nestjs/common';
import { configUsers } from 'src/models/model/configUser';
import { ConfigUsersDto } from '../complements/dto/configUser.dto';
import { ConfigUserService } from '../services/configuser.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('configUser')
export class ConfigUserController {
    constructor(private services: ConfigUserService){}


    @Get()
    async index(@Request() request){
        const datas = await this.services.getAll({
            limits: request.query.hasOwnProperty('limits') ? request.query.limits : 5,
            pages: request.query.hasOwnProperty('pages') ? request.query.pages : 0,
          });

      return datas
    }

    
    @Get(':id')
    findByUuid(@Param('id') id:number):Promise<configUsers[]>{
        return this.services.findById(id);
    }
  

    @Post()
    create(@Body() IndexDto:ConfigUsersDto):Promise<configUsers>{
        IndexDto.unique_id = uuidv4()
        return this.services.Create(IndexDto)
    }


    @Put(':id')
    Update(@Param('id') id:number, @Body() IndexDto:ConfigUsersDto):Promise<configUsers[]>{
        IndexDto.updatedAt = new Date
        return this.services.Update(id, IndexDto)
    }


    @Delete(':id')
    Delete(@Param('id') id:number, @Body() IndexDto:ConfigUsersDto):Promise<configUsers[]>{
        IndexDto.status = false
        IndexDto.deleteAt = new Date
        return this.services.delete(id, IndexDto)
    }

    
}

