import { Body, Controller, Post } from '@nestjs/common';
import { RolesYsapDto } from 'src/app/complements/dto/Ysap.dto';
import { YsapRolesService } from 'src/app/services/ysap/ysaproles.service';

@Controller('ysapRoles')
export class YsapRolesController {
    constructor(private services: YsapRolesService){}

    @Post()
    create(@Body() IndexDto:RolesYsapDto ):Promise<any>{      
        return this.services.Create(IndexDto)
    }

}
