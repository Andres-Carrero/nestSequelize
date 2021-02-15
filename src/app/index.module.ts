import { Module } from '@nestjs/common';
import { BusinessUnitModule } from './modules/businessUnit.module';
import { ConfigUserModule } from './modules/configUser.module';
import { PermissionModule } from './modules/permission.module';
import { BusinessUserModule } from './modules/relations/businessUser.module';
import { PermissionRoleModule } from './modules/relations/permissionrole.module';
import { UserRoleModule } from './modules/relations/userrole.module';
import { RoleModule } from './modules/role.module';
import { UserModule } from './modules/user.module';
import { TenantModule } from "./modules/tenant.module";
import { ContractModule } from './modules/contract.module';
import { ProcessModule } from './modules/process.module';
import { TypesServicesModule } from './modules/typesServices.module';
import { TypeIdentificationDocModule } from './modules/typeIdentificationDoc.module';


@Module({
    imports: [
        TypeIdentificationDocModule,
        TypesServicesModule,
        UserModule,
        RoleModule,
        ConfigUserModule,
        TenantModule,
        BusinessUserModule,
        PermissionRoleModule,
        UserRoleModule,
        PermissionModule,
        ContractModule,
        BusinessUnitModule,
        ProcessModule
    ],
    controllers: [],
    providers: [],
})
export class IndexModule { }
