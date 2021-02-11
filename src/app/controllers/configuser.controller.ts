import { Controller, Get, Post, Put, Delete, Param, Body, Response, Request } from '@nestjs/common';
import { configUsers } from 'src/models/model/configUser';
import { ConfigUsersDto } from '../complements/dto/configUser.dto';
import { ConfigUserService } from '../services/configuser.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('configUser')
export class ConfigUserController {
    constructor(private services: ConfigUserService){}


    /*@Get()
    async index(@Request() request): Promise<Pagination<configUsersRepository>> {
      return await this.services.paginate({
        limit: request.query.hasOwnProperty('limit') ? request.query.limit : 2,
        page: request.query.hasOwnProperty('page') ? request.query.page : 0,
      });
    }*/

    
    @Get(':id')
    findByUuid(@Param('id') id:number):Promise<configUsers[]>{
        return this.services.findById(id);
    }
  

    @Post()
    create(@Body() IndexDto:ConfigUsersDto):Promise<configUsers>{
        IndexDto.unique_id = 'Config:' + uuidv4()
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

