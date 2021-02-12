import { PermissionRoleController } from './../../controllers/permissionrole.controller';
import { PermissionRoleService } from './../../services/permissionrole.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { permissionRole } from 'src/models/model/relations/permissionRole';
import { permission } from 'src/models/model/permission';
import { roles } from 'src/models/model/role';

@Module({
    imports: [
        SequelizeModule.forFeature([
            permissionRole,
            permission,
            roles
        ]),
    ],
    controllers: [
        PermissionRoleController,],
    providers: [
        PermissionRoleService,],
})
export class PermissionRoleModule { }
