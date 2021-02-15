import { ContractController } from './../controllers/contract.controller';
import { ContractService } from './../services/contract.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Contract } from 'src/models/model/contract';


@Module({
    imports: [
        SequelizeModule.forFeature([
            Contract,
        ]),
    ],
    controllers: [
        ContractController,],
    providers: [
        ContractService,],
})
export class ContractModule { }
