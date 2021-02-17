import { TypedocvehiclesController } from './../controllers/typedocvehicles.controller';
import { TypedocvehiclesService } from './../services/typedocvehicles.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { typeDocVehicles } from 'src/models/model/typeDocVehicles';

@Module({
    imports: [
        SequelizeModule.forFeature([
            typeDocVehicles,
        ]),
    ],
    controllers: [
        TypedocvehiclesController,],
    providers: [
        TypedocvehiclesService,],
})
export class TypeDocVehiclesModule { }
