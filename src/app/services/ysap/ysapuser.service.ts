import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { statusYsap } from 'src/models/model/ysap/statusYsap';
import { thirdWalletYsap } from 'src/models/model/ysap/thirdWalletYsap';
import { usersYsap } from 'src/models/model/ysap/userYsap';
import * as bcrypt from "bcrypt";
import { isEmail } from 'class-validator';
import * as jwt from "jsonwebtoken";
import { rolesYsap } from 'src/models/model/ysap/rolesYsap';
import { secretJWT } from "src/models/config/jwt.config";
import * as moment from "moment";


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


async loginYsap(data){
  const email = data.email
  const passoword = data.password   //@ts-ignore

  const findUser = await this.UserModel.findOne({ where: {email: email, statusId: 1}, include: [rolesYsap]  })
    if(!findUser){  throw new Error("no existe este usuario") }
  
  const passwordHash = findUser.password
  const access = await bcrypt.compareSync(passoword, passwordHash)
    if(!access){  throw new Error("contraseña erronea") }
  
  const token = await this.createTokenYsap(findUser)
    if(!token){ throw new Error("token erroneo") }
      
  const id = findUser.id
  const unique_id = findUser.unique_id
  const name = findUser.name
  const apikey = findUser.apikey
  const typeMoney = findUser.typeMoney
  const role = findUser.role.name
  
    return {
      success: true,
      token,
      identity: {
          id,
          unique_id,
          name,
          apikey,
          typeMoney,
          role,
          email
      }
    }
}


createTokenYsap(data){
  const now = moment()
  const payload = {
      id: data.id,
      unique_id: data.unique_id,
      name: data.name,
      apikey: data.apikey,
      typeMoney: data.typeMoney,
      role: data.role.name,
      iat: now.unix(),
      exp: now.add(10, 'years').unix()
  }
  const token = jwt.sign(payload, secretJWT) 

      return token
}


verifyTokenYsap(headers){
  console.log(headers);
  
  const headersToken = headers
    if(!headersToken || headersToken == ''){  throw new Error("token no encontrado")  }

  const payload = jwt.verify(headersToken, secretJWT)
    if (!payload) { throw new Error("token no valido")  }
      
      return payload
  }

    
async uuidUser(id):Promise<usersYsap>{   
  const findiduser = await this.UserModel.findOne({where:{unique_id: id} })
    if (findiduser == null){throw new NotFoundException('No hay resultados')}
      return findiduser
}


async UpdateUsers(id, user ){
  const password = user.password
  const typeMoney = user.typeMoney
  if(password){
    const hashPassword = bcrypt.hashSync(password, 10)
    user.password = hashPassword
  }
  if(typeMoney){
    user.typeMoney = typeMoney
  }


  const update = await this.UserModel.update(user, {where: {unique_id: id}})
    return {update, user}
}


async CreateUsers(data):Promise<usersYsap>{   
  const emailVerify = isEmail(data.email)
    if(emailVerify == false){throw new Error("email no valido")}

  const password = data.password
  const hashPassword = bcrypt.hashSync(password, 10)
    data.password = hashPassword

  const newUser = await this.UserModel.create(data);
    return newUser
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
    }   //@ts-ignore

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
  }           //@ts-ignore

  const newWallet = await this.walletModel.create(wallet1 )//@ts-ignore
  const newWallet2 = await this.walletModel.create(wallet2 )//@ts-ignore
  const newWallet3 = await this.walletModel.create(wallet3 )//@ts-ignore
  const newWallet4 = await this.walletModel.create(wallet4 )

    return {newWallet, newWallet2, newWallet3, newWallet4}
  }




}
