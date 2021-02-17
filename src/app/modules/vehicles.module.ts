import { VehiclesController } from './../controllers/vehicles.controller';
import { VehiclesService } from './../services/vehicles.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vehicles } from 'src/models/model/vehicles';

@Module({
    imports: [
        SequelizeModule.forFeature([
            Vehicles,
        ]),
    ],
    controllers: [
        VehiclesController,],
    providers: [
        VehiclesService,],
})
export class VehiclesModule { }
