import { Body, Controller, Post } from '@nestjs/common';
import { BoxYsapDto } from 'src/app/complements/dto/Ysap.dto';
import { BoxYsapService } from 'src/app/services/ysap/boxysap.service';

@Controller('ysapBox')
export class YsapBoxController { 
    constructor(private services: BoxYsapService){}

    @Post()
    async create(@Body() body: BoxYsapDto){
        const newData = await this.services.create(body)
        return newData
    }

 }
