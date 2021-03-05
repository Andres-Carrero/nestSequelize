import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { buttonGenerateDto } from 'src/app/complements/dto/Ysap.dto';
import { ButtonGenerateService } from 'src/app/services/ysap/buttongenerate.service';
import { buttonsGenerateYsap } from 'src/models/model/ysap/buttonsYsap';

@Controller('buttonsYsap')
export class ButtonGenerateController {
    constructor(private services: ButtonGenerateService){}


    @Post()
    create(@Body() IndexDto:buttonGenerateDto):Promise<any>{      
        return this.services.Create(IndexDto)
    }

    @Post('all/:id')
    async index(@Param('id') id:number, @Body() body){
  
        const datas = await this.services.getAll(id, {
            limits: body.limits ? body.limits : 20,
            pages: body.pages ? body.pages : 0,
            orden: body.orden ? body.orden : 'ASC',
          });
      return datas
    }

    @Put(':id')
    async update(@Param('id') id:string, @Body() body:buttonGenerateDto){
        const datas = await this.services.update(id, body)
        return datas
    }

    
 }
