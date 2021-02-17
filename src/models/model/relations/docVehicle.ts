import { 
    Column, 
    Model, 
    Table, 
    Unique, 
    ForeignKey,
    DataType,
    DeletedAt,
    AllowNull,
    BelongsToMany
} from 'sequelize-typescript';
import { Vehicles } from '../vehicles';
import { typeDocVehicles } from '../typeDocVehicles';

@Table({
    tableName: 'DocVehicle',
    timestamps: true
})
export class DocVehicles extends Model{

    //@ts-ignore
    @ForeignKey(() => Vehicles)
    @Column
    vehicleId: number;
  
    //@ts-ignore
    @ForeignKey(() => typeDocVehicles)
    @Column
    TypeDocId: number;


    @AllowNull(false)
    @Column({type: DataType.STRING})
    expirationDate: string


}