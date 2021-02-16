import { CommuneController } from './../controllers/commune.controller';
import { CommuneService } from './../services/commune.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Commune } from 'src/models/model/commune';

@Module({
    imports: [
        SequelizeModule.forFeature([
            Commune,
        ]),
    ],
    controllers: [
        CommuneController,],
    providers: [
        CommuneService,],
})
export class CommuneModule { }
