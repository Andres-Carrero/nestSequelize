import { Controller, Get,Request, Param, Post, Body  } from '@nestjs/common';
import { PaymentYsapDto } from 'src/app/complements/dto/Ysap.dto';
import { YsapPaymentService } from 'src/app/services/ysap/ysappayment.service';
import { paymentYsap } from 'src/models/model/ysap/paymentYsap';
import { v4 as uuidv4 } from 'uuid';

@Controller('paymentYsap')
export class YsapPaymentController { 
    constructor(private services: YsapPaymentService){}

    
    @Post('all')
    async index(@Body() body){
  
        const datas = await this.services.getAll({
            limits: body.limits ? body.limits : 20,
            pages: body.pages ? body.pages : 0,
            orden: body.orden ? body.orden : 'ASC',
            columns: body.columns,
            filter: body.filter
          });
          //console.log(datas);
          

      return datas
    }
    

    @Get(':id')
    findByUuid(@Param('id') id:number):Promise<paymentYsap>{
        console.log(id);
        
        return this.services.findById(id);
    }
  

    @Post()
    create(@Body() IndexDto:PaymentYsapDto):Promise<paymentYsap>{
        return this.services.Create(IndexDto)
    }
}
