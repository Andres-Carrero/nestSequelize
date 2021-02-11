import { PermissionController } from './../controllers/permission.controller';
import { PermissionService } from './../services/permission.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { permission } from 'src/models/model/permission';

@Module({
    imports: [
        SequelizeModule.forFeature([
            permission, 
        ]),
    ],
    controllers: [
        PermissionController, ],
    providers: [
        PermissionService, ],
})
export class PermissionModule {}
