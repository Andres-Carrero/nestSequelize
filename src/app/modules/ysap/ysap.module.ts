import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { YsapAddressController } from 'src/app/controllers/ysap/ysapaddress.controller';
import { YsapButtonController } from 'src/app/controllers/ysap/ysapbutton.controller';
import { YsapPaymentController } from 'src/app/controllers/ysap/ysappayment.controller';
import { YsapUsersController } from 'src/app/controllers/ysap/ysapusers.controller';
import { YsapAddressService } from 'src/app/services/ysap/ysapaddress.service';
import { YsapButtonService } from 'src/app/services/ysap/ysapbutton.service';
import { YsapPaymentService } from 'src/app/services/ysap/ysappayment.service';
import { YsapUserService } from 'src/app/services/ysap/ysapuser.service';
import { addressYsap } from 'src/models/model/ysap/addressYsap';
import { buttonYsap } from 'src/models/model/ysap/buttonYsap';
import { paymentYsap } from 'src/models/model/ysap/paymentYsap';
import { usersYsap } from 'src/models/model/ysap/userYsap';

@Module({
    imports: [
        SequelizeModule.forFeature([
            usersYsap,
            buttonYsap,
            addressYsap,
            paymentYsap
        ]),
    ],
    controllers: [
        YsapUsersController,
        YsapButtonController,
        YsapAddressController,
        YsapPaymentController,
    ],
    providers: [
        YsapUserService,
        YsapButtonService,
        YsapAddressService,
        YsapPaymentService,
    ],
})
export class YsapModule {}
