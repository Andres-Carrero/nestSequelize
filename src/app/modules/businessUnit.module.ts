import { BusinessUnitController } from '../controllers/businessUnit.controller';
import { BusinessUnitService } from './../services/businessunit.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { businessUnit } from 'src/models/model/businessUnit';

@Module({
    imports: [
        SequelizeModule.forFeature([
            businessUnit,
        ]),
    ],
    controllers: [
        BusinessUnitController,],
    providers: [
        BusinessUnitService,],
})
export class BusinessUnitModule { }
