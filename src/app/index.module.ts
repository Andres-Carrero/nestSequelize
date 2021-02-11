import { Module } from '@nestjs/common';
import { BusinessUnitModule } from './modules/businessUnit.module';
import { ConfigUserModule } from './modules/configUser.module';
import { PermissionModule } from './modules/permission.module';
import { BusinessUserModule } from './modules/relations/businessuser.module';
import { PermissionRoleModule } from './modules/relations/permissionrole.module';
import { UserRoleModule } from './modules/relations/userrole.module';
import { RoleModule } from './modules/role.module';
import { UserModule } from './modules/user.module';
import { TenantModule } from "./modules/tenant.module";


@Module({
    imports: [
        UserModule,
        RoleModule,
        ConfigUserModule,
        TenantModule,
        BusinessUserModule,
        PermissionRoleModule,
        UserRoleModule,
        PermissionModule,
        BusinessUnitModule,
    ],
    controllers: [],
    providers: [],
})
export class IndexModule { }
