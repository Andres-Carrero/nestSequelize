import { Body, Controller, Param, Post, Put, Headers } from '@nestjs/common';
import { BoxYsapDto } from 'src/app/complements/dto/Ysap.dto';
import { BoxYsapService } from 'src/app/services/ysap/boxysap.service';

@Controller('ysapBox')
export class YsapBoxController { 
    constructor(private services: BoxYsapService){}

    @Post()
    async create(@Body() body: BoxYsapDto, @Headers() headers){        
        if(!headers.apikey){
            throw new Error("apiKey no encontrado")
        }
        const newData = await this.services.create(headers, body)
        return newData
    }

    @Post('all/:id')
    async index(@Param('id') id:number, @Body() body){
  
        const datas = await this.services.getAll(id, {
            limits: body.limits ? body.limits : 20,
            pages: body.pages ? body.pages : 0,
            orden: body.orden ? body.orden : 'ASC',
            columns: body.columns,
            filter: body.filter
          });
      return datas
    }

    @Put(':id')
    async update(@Param('id') id:string, @Body() body:BoxYsapDto){
        const datas = await this.services.update(id, body)
        return datas
    }



}
