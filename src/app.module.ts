import { YsapPaymentService } from './app/services/ysap/ysappayment.service';
import { YsapAddressService } from './app/services/ysap/ysapaddress.service';
import { YsapButtonService } from './app/services/ysap/ysapbutton.service';
import { YsapUserService } from './app/services/ysap/ysapuser.service';
import { YsapPaymentController } from './app/controllers/ysap/ysappayment.controller';
import { YsapAddressController } from './app/controllers/ysap/ysapaddress.controller';
import { YsapButtonController } from './app/controllers/ysap/ysapbutton.controller';
import { YsapUsersController } from './app/controllers/ysap/ysapusers.controller';
import { YsapModule } from './app/modules/ysap/ysap.module';
import { WorkflowTypeActionService } from './app/services/workflowtypeaction.service';
import { WorkflowTypeActionController } from './app/controllers/workflowtypeaction.controller';

import { IndexModule } from './app/index.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    YsapModule,
    IndexModule,

    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'pruebas',
      autoLoadModels: true,
      synchronize: true,
      models: [__dirname + '/models/entity/*{.ts}'],
    }),



  ],
  controllers: [
    AppController],
  providers: [
    AppService],
})
export class AppModule { }
