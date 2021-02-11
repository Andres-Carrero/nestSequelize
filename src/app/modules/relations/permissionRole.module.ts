import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { permissionRole } from 'src/models/model/permissionRole';

@Module({
    imports: [
        SequelizeModule.forFeature([
            permissionRole,
        ]),
    ],
    controllers: [],
    providers: [],
})
export class PermissionRoleModule { }
