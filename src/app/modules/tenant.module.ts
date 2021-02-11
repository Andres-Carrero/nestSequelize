import { TenantController } from './../controllers/tenant.controller';
import { TenantService } from './../services/tenant.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { tenant } from 'src/models/model/tenant';

@Module({
    imports: [
        SequelizeModule.forFeature([
            tenant, 
        ]),
    ],
    controllers: [
        TenantController, ],
    providers: [
        TenantService, ],
})
export class TenantModule {}
