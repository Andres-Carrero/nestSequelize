import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ButtonGenerateController } from 'src/app/controllers/ysap/buttongenerate.controller';
import { YsapAddressController } from 'src/app/controllers/ysap/ysapaddress.controller';
import { YsapBoxController } from 'src/app/controllers/ysap/ysapbox.controller';
import { YsapBoxPaymentController } from 'src/app/controllers/ysap/ysapboxpayment.controller';
import { YsapButtonController } from 'src/app/controllers/ysap/ysapbutton.controller';
import { YsapPaymentController } from 'src/app/controllers/ysap/ysappayment.controller';
import { YsapPruebasController } from 'src/app/controllers/ysap/ysappruebas.controller';
import { YsapThirdWalletController } from 'src/app/controllers/ysap/ysapthirdwallet.controller';
import { YsapUsersController } from 'src/app/controllers/ysap/ysapusers.controller';
import { YsapWalletsController } from 'src/app/controllers/ysap/ysapwallets.controller';
import { BoxYsapService } from 'src/app/services/ysap/boxysap.service';
import { ButtonGenerateService } from 'src/app/services/ysap/buttongenerate.service';
import { YsapAddressService } from 'src/app/services/ysap/ysapaddress.service';
import { YsapBoxPaymentService } from 'src/app/services/ysap/ysapboxpayment.service';
import { YsapButtonService } from 'src/app/services/ysap/ysapbutton.service';
import { YsapPaymentService } from 'src/app/services/ysap/ysappayment.service';
import { YsapPruebasService } from 'src/app/services/ysap/ysappruebas.service';
import { YsapThirdWalletService } from 'src/app/services/ysap/ysapthirdwallet.service';
import { YsapUserService } from 'src/app/services/ysap/ysapuser.service';
import { YsapWalletsService } from 'src/app/services/ysap/ysapwallets.service';
import { addressYsap } from 'src/models/model/ysap/addressYsap';
import { boxPaymentYsap } from 'src/models/model/ysap/boxPayments';
import { BoxYsap } from 'src/models/model/ysap/boxYsap';
import { buttonsGenerateYsap } from 'src/models/model/ysap/buttonsYsap';
import { buttonYsap } from 'src/models/model/ysap/buttonYsap';
import { paymentYsap } from 'src/models/model/ysap/paymentYsap';
import { rolesYsap } from 'src/models/model/ysap/rolesYsap';
import { statusYsap } from 'src/models/model/ysap/statusYsap';
import { thirdWalletYsap } from 'src/models/model/ysap/thirdWalletYsap';
import { usersYsap } from 'src/models/model/ysap/userYsap';
import { WalletsYsap } from 'src/models/model/ysap/walletsYsap';

@Module({
    imports: [
        
        SequelizeModule.forFeature([
            usersYsap,
            buttonYsap,
            addressYsap,
            paymentYsap,
            thirdWalletYsap,
            statusYsap,
            buttonsGenerateYsap,
            BoxYsap,
            rolesYsap,
            boxPaymentYsap,
            WalletsYsap
        ]),
    ],
    controllers: [
        YsapUsersController,
        YsapButtonController,
        YsapAddressController,
        YsapPaymentController,
        YsapThirdWalletController,
        ButtonGenerateController,
        YsapBoxController,
        YsapBoxPaymentController,
        YsapWalletsController,
        YsapPruebasController
    ],
    providers: [
        YsapUserService,
        YsapButtonService,
        YsapAddressService,
        YsapPaymentService,
        YsapThirdWalletService,
        ButtonGenerateService,
        BoxYsapService,
        YsapBoxPaymentService,
        YsapWalletsService,
        YsapPruebasService
        
    ],
})
export class YsapModule {}
