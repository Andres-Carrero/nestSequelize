import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AddressYsapDto } from 'src/app/complements/dto/Ysap.dto';
import { YsapAddressService } from 'src/app/services/ysap/ysapaddress.service';
import { addressYsap } from 'src/models/model/ysap/addressYsap';

@Controller('addressYsap')
export class YsapAddressController { 
    constructor(private services: YsapAddressService){}

    
    @Post('all')
    async index(@Body() body){
  
        const datas = await this.services.getAll({
            limits: body.limits ? body.limits : 20,
            pages: body.pages ? body.pages : 0,
            orden: body.orden ? body.orden : 'ASC',
          });
          //console.log(datas);
          

      return datas
    }
    
    @Post()
    create(@Body() IndexDto:AddressYsapDto):Promise<addressYsap>{
        return this.services.Create(IndexDto)
    }
}
