import { TypeskillsController } from './../controllers/typeskills.controller';
import { TypeskillsService } from './../services/typeskills.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TypeSkills } from 'src/models/model/typeSkills';

@Module({
    imports: [
        SequelizeModule.forFeature([
            TypeSkills,
        ]),
    ],
    controllers: [
        TypeskillsController,],
    providers: [
        TypeskillsService,],
})
export class TypeSkillsModule { }
