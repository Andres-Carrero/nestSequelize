import { UserRoleController } from './../../controllers/userrole.controller';
import { UserRoleService } from '../../services/userRole.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { userRole } from 'src/models/model/relations/userRole';
import { users } from 'src/models/model/user';
import { roles } from 'src/models/model/role';

@Module({
    imports: [
        SequelizeModule.forFeature([
            userRole,
            users,
            roles
        ]),
    ],
    controllers: [
        UserRoleController,],
    providers: [
        UserRoleService,],
})
export class UserRoleModule { }
