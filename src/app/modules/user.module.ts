import { UserService } from './../services/user.service';
import { UserController } from './../controllers/user.controller';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { users } from 'src/models/model/user';
import { userRole } from 'src/models/model/userRole';
import { configUsers } from 'src/models/model/configUser';


@Module({
    imports: [
        SequelizeModule.forFeature([    users, configUsers   ]),
    ],
    controllers: [
        UserController,],
    providers: [
        UserService,],
})
export class UserModule { }
