import { ParametersController } from './../controllers/parameters.controller';
import { ParametersService } from './../services/parameters.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Parameters } from 'src/models/model/Parameters';

@Module({
    imports: [
        SequelizeModule.forFeature([
            Parameters,
        ]),
    ],
    controllers: [
        ParametersController,],
    providers: [
        ParametersService,],
})
export class ParametersModule { }
