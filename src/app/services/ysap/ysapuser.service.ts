import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { statusYsap } from 'src/models/model/ysap/statusYsap';
import { thirdWalletYsap } from 'src/models/model/ysap/thirdWalletYsap';
import { usersYsap } from 'src/models/model/ysap/userYsap';

@Injectable()
export class YsapUserService {
    constructor(
        @InjectModel(usersYsap)
        private readonly UserModel: typeof usersYsap,
        @InjectModel(statusYsap)
        private readonly statusModel: typeof statusYsap,
        @InjectModel(thirdWalletYsap)
        private readonly walletModel: typeof thirdWalletYsap,
    ){}

    async uuidUser(id):Promise<usersYsap>{   
      const findiduser = await this.UserModel.findOne({where:{unique_id: id} })
      if (findiduser == null){
        throw new NotFoundException('No hay resultados')
      }
      return findiduser
    }
    

    async CreateUsers(user):Promise<usersYsap>{//@ts-ignore
      const newUser = await this.UserModel.create(user);
      return newUser
    }
          
  
    async UpdateUsers(id, user ):Promise<usersYsap[]>{
      const update = await this.UserModel.update(user, {where: {unique_id: id}})
      return user
    }

    async CreateStatus():Promise<any>{
      const status1 = {
        id: 1,
        name: 'Activo',
      }
      const status2 = {
        id: 2,
        name: 'Pendiente',
      }
      const status3 = {
        id: 3,
        name: 'Inhactivo',
      }

      //@ts-ignore
      const newStatus = await this.statusModel.create(status1)//@ts-ignore 
      const newStatus2 = await this.statusModel.create(status2) //@ts-ignore
      const newStatus3 = await this.statusModel.create(status3)
      return {newStatus, newStatus2, newStatus3}
    }

    async CreateWallets():Promise<any>{
      const wallet1 = {
        id: 1,
        name: 'Electrum',
        description: 'V1',
        slug: 'electrum',
        unique_id: 'electrum_wallet'
      }
      const wallet2 = {
        id: 2,
        name: 'Binance',
        description: 'V1',
        slug: 'binance',
        unique_id: 'binance_wallet'
      }
      const wallet3 = {
        id: 3,
        name: 'Blockonomics',
        description: 'V1',
        slug: 'blockonomics',
        unique_id: 'blockonomics_wallet'
      }
      const wallet4 = {
        id: 4,
        name: 'Blockchain',
        description: 'V1',
        slug: 'blockchain',
        unique_id: 'blockchain_wallet'
      }

      //@ts-ignore
      const newWallet = await this.walletModel.create(wallet1 )//@ts-ignore
      const newWallet2 = await this.walletModel.create(wallet2 )//@ts-ignore
      const newWallet3 = await this.walletModel.create(wallet3 )//@ts-ignore
      const newWallet4 = await this.walletModel.create(wallet4 )


      return {newWallet, newWallet2, newWallet3, newWallet4}
    }



}
