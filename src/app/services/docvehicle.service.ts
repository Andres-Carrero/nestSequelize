import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DocVehicles } from 'src/models/model/relations/docVehicle';
import { typeDocVehicles } from 'src/models/model/typeDocVehicles';
import { Vehicles } from 'src/models/model/vehicles';
import { PaginationOptionsInterface } from '../complements/interface/paginator.interface';

@Injectable()
export class DocvehicleService {
    constructor(
        @InjectModel(Vehicles)
        private readonly VehiclesModel: typeof Vehicles,
        @InjectModel(typeDocVehicles)
        private readonly typeDocVehiclesModel: typeof typeDocVehicles,
        @InjectModel(DocVehicles)
        private readonly DocVehiclesModel: typeof DocVehicles,
      ){}

      async getAll(options: PaginationOptionsInterface): Promise<any>{
        const {count, rows} = await this.DocVehiclesModel.findAndCountAll({
        limit: options.limits,
        offset: options.pages,
        });
 
      return {rows, count};
      }


    async findOne(vehicleId){
      const finduser = await this.VehiclesModel.findOne({where:{id: vehicleId} }  )
      if (finduser == null || !finduser ){return [vehicleId, 'no hay resultados']}

      const findUserRole = await this.DocVehiclesModel.findAll({where: {vehicleId: finduser.id}}  )
      if (findUserRole == null || !findUserRole ){return [vehicleId, 'no hay resultados']}

      return findUserRole
    }
  
  
    async Create(vehicleId, TypeDocId, data){
      const finduser = await this.VehiclesModel.findOne({where:{id: vehicleId} }  )
      if (finduser == null || !finduser ){return [vehicleId, 'no hay resultados']}

      const findbusiness = await this.typeDocVehiclesModel.findOne({where: {id: TypeDocId}  } )
      if (findbusiness == null || !findbusiness ){return [TypeDocId, 'no hay resultados']}

      const newUserRole = await this.DocVehiclesModel.create({
        vehicleId: finduser.id,
        TypeDocId: findbusiness.id,
        expirationDate: data.expirationDate,

      });

      return [newUserRole, finduser, findbusiness]
    }


    async update(vehicleId, TypeDocId, data){
      const finduser = await this.VehiclesModel.findOne({where:{id: vehicleId} })
      if (finduser == null || !finduser ){return [vehicleId, 'no hay resultados']}
        console.log(finduser);
        
    
      const findbusiness = await this.typeDocVehiclesModel.findOne({where: {id: TypeDocId}  } )
      if (findbusiness == null || !findbusiness ){return [TypeDocId, 'no hay resultados']}
      console.log(findbusiness);
      
      
      await this.DocVehiclesModel.destroy({where: {vehicleId: finduser.id}})
      const newUserbussiness = await this.DocVehiclesModel.create({
        vehicleId: finduser.id,
        TypeDocId: findbusiness.id,
        expirationDate: data.expirationDate,
      });
     
      return newUserbussiness
    }
    

    async deleteAll(vehicleId){
      const finduser = await this.VehiclesModel.findOne({where:{id: vehicleId} })
      if (finduser == null || !finduser ){return [vehicleId, 'no hay resultados']}
      
      const deletes = await this.DocVehiclesModel.destroy({where: {vehicleId: finduser.id}})    
      return deletes
    }
 
  
}
  
