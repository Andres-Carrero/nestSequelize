import { CrewProfessionalController } from './../../controllers/crewprofessional.controller';
import { CrewProfessionalService } from './../../services/crewprofessional.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Crew } from 'src/models/model/crew';
import { professionals } from 'src/models/model/professionals';
import { crewProfessional } from 'src/models/model/relations/crewProfessional';

@Module({
    imports: [
        SequelizeModule.forFeature([
            crewProfessional,
            professionals,
            Crew
        ]),
    ],
    controllers: [
        CrewProfessionalController,],
    providers: [
        CrewProfessionalService,],
})
export class CrewProfessionalModule { }
