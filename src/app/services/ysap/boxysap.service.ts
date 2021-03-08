import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { addressYsap } from 'src/models/model/ysap/addressYsap';
import { BoxYsap } from 'src/models/model/ysap/boxYsap';
import { statusYsap } from 'src/models/model/ysap/statusYsap';
import { usersYsap } from 'src/models/model/ysap/userYsap';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BoxYsapService { 
box: any = []

    constructor(
        @InjectModel(BoxYsap)
        private readonly Model: typeof BoxYsap,
        @InjectModel(statusYsap)
        private readonly statusModel: typeof statusYsap,
        @InjectModel(usersYsap)
        private readonly userModel: typeof usersYsap,
        @InjectModel(addressYsap)
        private readonly addressModel: typeof addressYsap,
    ){}

    async create(data){      
        const user = data.userId
        const address = data.addressId

        const findAddress = await this.addressModel.findOne({where: {id: address}})
        if(!findAddress){throw new Error("Direccion no encontrada")}

        //@ts-ignore
        const findUser = await this.userModel.findOne({where: {id: user}, include: [addressYsap]   })
        if(!findUser){throw new Error("usuario no encontrado")}
        const idAddress = findUser.address //@ts-ignore

        for (let index = 0; index < idAddress.length; index++) {
            const element = idAddress[index];
            
            if(findAddress.id === element.id){
                data.userId = findUser.id
                data.addressId = findAddress.id
                data.unique_id = uuidv4()
                data.statusId = 1    
                this.box = await this.Model.create(data)
                if(!this.box || this.box == null || this.box == undefined){
                    throw new Error("no se logro crear")
                }
                return this.box
            } 
            
        }
        throw new Error("direccion no valida para este usuario")

    }



 }
