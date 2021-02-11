import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { businessUser } from 'src/models/model/businessUser';

@Module({
    imports: [
        SequelizeModule.forFeature([
            businessUser, 
        ]),
    ],
    controllers: [],
    providers: [],
})
export class BusinessUserModule { }
