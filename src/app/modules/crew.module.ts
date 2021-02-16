import { CrewController } from './../controllers/crew.controller';
import { CrewService } from './../services/crew.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Crew } from 'src/models/model/crew';

@Module({
    imports: [
        SequelizeModule.forFeature([
            Crew
        ]),
    ],
    controllers: [
        CrewController,],
    providers: [
        CrewService,],
})
export class CrewModule { }
