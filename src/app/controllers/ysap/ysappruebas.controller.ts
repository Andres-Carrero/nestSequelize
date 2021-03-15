import { Controller, Post } from '@nestjs/common';
import { YsapPruebasService } from 'src/app/services/ysap/ysappruebas.service';

@Controller('pruebas')
export class YsapPruebasController { 
    constructor(private services: YsapPruebasService){}

    @Post('trush')
    connection(){
        const newConnect = this.services.connectTrush()
        return newConnect
    }

    @Post('transaction')
    connectionV2(){
        const newConnect = this.services.sendTrasaction()
        return newConnect
    }
}
