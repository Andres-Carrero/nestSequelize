import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { usersYsap } from 'src/models/model/ysap/userYsap';

@Injectable()
export class YsapUserService {
    constructor(
        @InjectModel(usersYsap)
        private readonly UserModel: typeof usersYsap,
    ){}



    async uuidUser(id):Promise<usersYsap>{
      console.log(id);
      
      const findiduser = await this.UserModel.findOne({where:{unique_id: id} })
      if (findiduser == null){
        throw new NotFoundException('No hay resultados')
      }
      return findiduser
    }
    

    async CreateUsers(user):Promise<usersYsap>{

      //@ts-ignore
      const newUser = await this.UserModel.create(user);
      return newUser
    }
          
  
    async UpdateUsers(id, user ):Promise<usersYsap[]>{
      const update = await this.UserModel.update(user, {where: {unique_id: id}})
      return user
    }


/*async login(body){
    const passWordBody = body.password

    const User = await this.UserModel.findOne({
        where: {email: body.email}
    })


    const passwordWeb = User.password
    if(passWordBody != passwordWeb){
        thro
    }
}

 loginWeb = async (req, res) => {
        try {
          const body = req.body
          const email = body.email
          const password = body.password
      
          // db.sequelize.options.logging = false
      
  
      
          const userFound = await User.findOne({
            include: [{ model: Gender }],
            where: { email, state_id: 1 },
          })
          if (!userFound)
            return res
              .status(400)
              .send({ message: "El usuario esta erroneo o se encuentra inhabilitado o la contraseña son erroneas" })
      
          const hashPassword = userFound.dataValues.password
          const canAccess = bcrypt.compareSync(password, hashPassword)
          if (!canAccess)
            return res
              .status(400)
              .send({ message: "El usuario o la contraseña son erroneas" })
      
          console.log("userFound.dataValues", userFound.dataValues)
          const token = jwtService.createToken(userFound.dataValues)
          if (!token) return res.status(400).send({ message: "Token no generado." })
          
          const id = userFound.dataValues.id
          const ids = userFound.dataValues.dni
          const userid = userFound.dataValues.caravela_user_id
          const fName = userFound.dataValues.first_name
          const sName = userFound.dataValues.second_name
          const fSurname = userFound.dataValues.first_surname
          const sSurname = userFound.dataValues.second_surname
      
          res.status(200).send({
            success: true,
            token,
            identity: {
              id,
              ids,
              userid,
              fName,
              sName,
              fSurname,
              sSurname,
              email,
              password,
            },
          })
        } catch (error) {
          console.log("Hubo un error iniciando sesión en BD remota: ", error)
          return res
            .status(400)
            .send({ message: "Hubo un error iniciando sesión en BD remota." })
        }
      }*/
}
