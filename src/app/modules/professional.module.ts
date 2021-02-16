import { ProfessionalController } from './../controllers/professional.controller';
import { ProfessionalService } from './../services/professional.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { professionals } from 'src/models/model/professionals';

@Module({
    imports: [
        SequelizeModule.forFeature([
            professionals,
        ]),
    ],
    controllers: [
        ProfessionalController,],
    providers: [
        ProfessionalService,],
})
export class ProfessionalModule { }
