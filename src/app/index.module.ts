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
import { UpzModule } from './modules/upz.module';
import { TypeSkillsModule } from './modules/typeskills.module';
import { ParametersModule } from './modules/parameters.module';
import { DepartmentModule } from './modules/department.module';
import { CommuneModule } from './modules/commune.module';
import { CityModule } from './modules/city.module';
import { CountryModule } from "./modules/country.module";
import { ProfessionalModule } from './modules/professional.module';
import { ProfessionalSkillModule } from './modules/relations/professionalskill.module';
import { TypeProfessionalModule } from './modules/typeprofessional.module';
import { CrewProfessionalModule } from "./modules/relations/crewprofessional.module";
import { CrewModule } from './modules/crew.module';
import { VehiclesModule } from './modules/vehicles.module';
import { TypeDocVehiclesModule } from './modules/typedocvehicles.module';
import { DocVehicleModule } from './modules/relations/docvehicle.module';
import { WorkflowModule } from './modules/workflow.module';
import { YsapModule } from './modules/ysap/ysap.module';



@Module({
    imports: [
        
        YsapModule,
        WorkflowModule,
        DocVehicleModule,
        VehiclesModule,
        TypeDocVehiclesModule,
        RoleModule,
        CrewModule,
        CrewProfessionalModule,
        TypeProfessionalModule,
        ProfessionalSkillModule,
        ProfessionalModule,
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
        ProcessModule,
        UpzModule,
        TypeSkillsModule,
        ParametersModule,
        DepartmentModule,
        ContractModule,
        CommuneModule,
        CityModule,
        CountryModule
    ],
    controllers: [],
    providers: [],
})
export class IndexModule { }
