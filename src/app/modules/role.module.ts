import { RoleController } from './../controllers/role.controller';
import { RoleService } from './../services/role.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { roles } from 'src/models/model/role';

@Module({
    imports: [
        SequelizeModule.forFeature([
            roles, 
        ]),
    ],
    controllers: [
        RoleController, ],
    providers: [
        RoleService, ],
})
export class RoleModule { }
