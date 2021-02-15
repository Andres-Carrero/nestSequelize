import { TypesServicesController } from './../controllers/typesservices.controller';
import { TypesServicesService } from './../services/typesservices.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { typeServices } from 'src/models/model/typesServices';

@Module({
    imports: [
        SequelizeModule.forFeature([
            typeServices,
        ]),
    ],
    controllers: [
        TypesServicesController,],
    providers: [
        TypesServicesService,],
})
export class TypesServicesModule { }
