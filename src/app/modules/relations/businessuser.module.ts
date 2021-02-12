import { BusinessUserController } from './../../controllers/businessuser.controller';
import { BusinessUserService } from './../../services/businessuser.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { businessUser } from 'src/models/model/relations/businessUser';
import { users } from 'src/models/model/user';
import { businessUnit } from 'src/models/model/businessUnit';

@Module({
    imports: [
        SequelizeModule.forFeature([
            businessUser,
            users,
            businessUnit
        ]),
    ],
    controllers: [
        BusinessUserController,],
    providers: [
        BusinessUserService,],
})
export class BusinessUserModule { }
