import { Controller, Get, Param } from '@nestjs/common';
import { YsapThirdWalletService } from 'src/app/services/ysap/ysapthirdwallet.service';

@Controller('walletThird')
export class YsapThirdWalletController { 
    constructor(private services: YsapThirdWalletService){}

    @Get()
    findAll():Promise<any>{
        return this.services.getAll();
    }

    @Get('id')
    findByUuid(@Param('id') id:number):Promise<any>{
        return this.services.getId(id);
    }
  



}