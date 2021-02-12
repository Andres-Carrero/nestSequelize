import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { businessUser } from 'src/models/model/relations/businessUser';
import { permissionRole } from 'src/models/model/relations/permissionRole';
import { userRole } from 'src/models/model/relations/userRole';

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
