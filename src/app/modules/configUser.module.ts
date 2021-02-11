import { ConfigUserController } from './../controllers/configuser.controller';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { configUsers } from 'src/models/model/configUser';
import { ConfigUserService } from '../services/configuser.service';

@Module({
    imports: [
        SequelizeModule.forFeature([
            configUsers,
        ]),
    ],
    controllers: [
        ConfigUserController,],
    providers: [ConfigUserService],
})
export class ConfigUserModule { }
