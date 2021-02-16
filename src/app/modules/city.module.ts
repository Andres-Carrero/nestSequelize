import { CityService } from './../services/city.service';
import { CityController } from './../controllers/city.controller';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { City } from 'src/models/model/city';

@Module({
    imports: [
        SequelizeModule.forFeature([
            City,
        ]),
    ],
    controllers: [
        CityController,],
    providers: [
        CityService,],
})
export class CityModule { }
