import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ButtonGenerateController } from 'src/app/controllers/ysap/buttongenerate.controller';
import { YsapAddressController } from 'src/app/controllers/ysap/ysapaddress.controller';
import { YsapBoxController } from 'src/app/controllers/ysap/ysapbox.controller';
import { YsapButtonController } from 'src/app/controllers/ysap/ysapbutton.controller';
import { YsapPaymentController } from 'src/app/controllers/ysap/ysappayment.controller';
import { YsapThirdWalletController } from 'src/app/controllers/ysap/ysapthirdwallet.controller';
import { YsapUsersController } from 'src/app/controllers/ysap/ysapusers.controller';
import { BoxYsapService } from 'src/app/services/ysap/boxysap.service';
import { ButtonGenerateService } from 'src/app/services/ysap/buttongenerate.service';
import { YsapAddressService } from 'src/app/services/ysap/ysapaddress.service';
import { YsapButtonService } from 'src/app/services/ysap/ysapbutton.service';
import { YsapPaymentService } from 'src/app/services/ysap/ysappayment.service';
import { YsapThirdWalletService } from 'src/app/services/ysap/ysapthirdwallet.service';
import { YsapUserService } from 'src/app/services/ysap/ysapuser.service';
import { addressYsap } from 'src/models/model/ysap/addressYsap';
import { BoxYsap } from 'src/models/model/ysap/boxYsap';
import { buttonsGenerateYsap } from 'src/models/model/ysap/buttonsYsap';
import { buttonYsap } from 'src/models/model/ysap/buttonYsap';
import { paymentYsap } from 'src/models/model/ysap/paymentYsap';
import { statusYsap } from 'src/models/model/ysap/statusYsap';
import { thirdWalletYsap } from 'src/models/model/ysap/thirdWalletYsap';
import { usersYsap } from 'src/models/model/ysap/userYsap';

@Module({
    imports: [
        SequelizeModule.forFeature([
            usersYsap,
            buttonYsap,
            addressYsap,
            paymentYsap,
            thirdWalletYsap,
            statusYsap ,
            buttonsGenerateYsap,
            BoxYsap
        ]),
    ],
    controllers: [
        YsapUsersController,
        YsapButtonController,
        YsapAddressController,
        YsapPaymentController,
        YsapThirdWalletController,
        ButtonGenerateController,
        YsapBoxController
    ],
    providers: [
        YsapUserService,
        YsapButtonService,
        YsapAddressService,
        YsapPaymentService,
        YsapThirdWalletService,
        ButtonGenerateService,
        BoxYsapService
    ],
})
export class YsapModule {}
