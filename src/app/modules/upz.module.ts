import { UpzController } from './../controllers/upz.controller';
import { UpzService } from './../services/upz.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Upz } from 'src/models/model/upz';

@Module({
    imports: [
        SequelizeModule.forFeature([
            Upz,
        ]),
    ],
    controllers: [
        UpzController,],
    providers: [
        UpzService,],
})
export class UpzModule { }
