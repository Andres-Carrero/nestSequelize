import { Body, Controller, Post, Headers, Param, Get, Put } from '@nestjs/common';
import { ButtonYsapDto } from 'src/app/complements/dto/Ysap.dto';
import { YsapButtonService } from 'src/app/services/ysap/ysapbutton.service';
import { buttonYsap } from 'src/models/model/ysap/buttonYsap';

@Controller('buttonYsap')
export class YsapButtonController{ 
    constructor(private services: YsapButtonService){}

    @Get(':id')
    findByUuid(@Param('id') id:number):Promise<buttonYsap>{
        return this.services.findById(id);
    }
  

    @Post('all')
    async index(@Body() body){
        const datas = await this.services.getAll({
            limits: body.limits ? body.limits : 20,
            pages: body.pages ? body.pages : 0,
            orden: body.orden ? body.orden : 'ASC',
          });
      return datas
    }
    
    
    @Post()
    create(@Headers() head, @Body() IndexDto:ButtonYsapDto):Promise<any>{      
        return this.services.Create(head, IndexDto)
    }


    @Put(':id')
    Update(@Param('id') id:number, @Body() IndexDto:ButtonYsapDto):Promise<any>{
        return this.services.Update(id, IndexDto)
    }





}