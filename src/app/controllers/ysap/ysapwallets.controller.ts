import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { WalletsYsapDto } from 'src/app/complements/dto/Ysap.dto';
import { YsapWalletsService } from 'src/app/services/ysap/ysapwallets.service';

@Controller('YsapWallets')
export class YsapWalletsController { 
    constructor(
        private services: YsapWalletsService
    ){}

    @Post()
    async createWallet(@Body() indexDto: WalletsYsapDto){
        const newData = this.services.createWallets(indexDto)
        return newData
    }

    @Post('all/:id')
    async index(@Param('id') id:number, @Body() body){
  
        const datas = await this.services.getAll(id, {
            limits: body.limits ? body.limits : 1000,
            pages: body.pages ? body.pages : 0,
            orden: body.orden ? body.orden : 'ASC',
            columns: body.columns,
            filter: body.filter
          });
      return datas
    }

    @Put(':id')
    async update(@Param('id') id:string, @Body() body:WalletsYsapDto){
        const datas = await this.services.update(id, body)
        return datas
    }


}
