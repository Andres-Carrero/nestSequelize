import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { businessUser } from 'src/models/model/businessUser';
import { permissionRole } from 'src/models/model/permissionRole';
import { userRole } from 'src/models/model/userRole';

@Module({
    imports: [
        SequelizeModule.forFeature([
            permissionRole,
            userRole,
            businessUser, 
        ]),
    ],
    controllers: [],
    providers: [],
})
export class RelationsModule { }
