import { ProfessionalskillService } from './../../services/professionalskill.service';
import { ProfessionalskillController } from './../../controllers/professionalskill.controller';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { professionalSkill } from 'src/models/model/relations/professionalSkill';
import { professionals } from 'src/models/model/professionals';
import { TypeSkills } from 'src/models/model/typeSkills';

@Module({
    imports: [
        SequelizeModule.forFeature([
            professionalSkill,
            professionals,
            TypeSkills
        ]),
    ],
    controllers: [
        ProfessionalskillController,],
    providers: [
        ProfessionalskillService,],
})
export class ProfessionalSkillModule { }
