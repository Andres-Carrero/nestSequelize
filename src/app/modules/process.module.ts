import { ProcessController } from './../controllers/process.controller';
import { ProcessService } from './../services/process.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Process } from 'src/models/model/process';

@Module({
    imports: [
        SequelizeModule.forFeature([
            Process,
        ]),
    ],
    controllers: [
        ProcessController,],
    providers: [
        ProcessService,],
})
export class ProcessModule { }
