import { DocvehicleController } from './../../controllers/docvehicle.controller';
import { DocvehicleService } from './../../services/docvehicle.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DocVehicles } from 'src/models/model/relations/docVehicle';
import { typeDocVehicles } from 'src/models/model/typeDocVehicles';
import { Vehicles } from 'src/models/model/vehicles';

@Module({
    imports: [
        SequelizeModule.forFeature([
            DocVehicles,
            typeDocVehicles,
            Vehicles
        ]),
    ],
    controllers: [
        DocvehicleController,],
    providers: [
        DocvehicleService,],
})
export class DocVehicleModule { }
