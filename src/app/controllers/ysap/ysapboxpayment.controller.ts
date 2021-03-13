import { Body, Controller, Param, Post } from '@nestjs/common';
import { BoxPaymentYsapDto } from 'src/app/complements/dto/Ysap.dto';
import { YsapBoxPaymentService } from 'src/app/services/ysap/ysapboxpayment.service';

@Controller('boxPayment')
export class YsapBoxPaymentController { 
    constructor(private services: YsapBoxPaymentService){}



    @Post('create')
    create(@Body() IndexDto: any):Promise<any>{      
        return this.services.CreateBoxPayment(IndexDto)
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


}
