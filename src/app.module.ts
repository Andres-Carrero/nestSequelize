import { IndexModule } from './app/index.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { secretJWT } from "src/models/config/jwt.config";

@Module({
  imports: [
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
