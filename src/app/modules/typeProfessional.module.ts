import { TypeProfessionalController } from './../controllers/typeprofessional.controller';
import { TypeProfessionalService } from './../services/typeprofessional.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TypeProfessional } from 'src/models/model/typeProfessional';

@Module({
    imports: [
        SequelizeModule.forFeature([
            TypeProfessional
        ]),
    ],
    controllers: [
        TypeProfessionalController,],
    providers: [
        TypeProfessionalService,],
})
export class TypeProfessionalModule { }
