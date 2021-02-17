import { 
    Column, 
    Model,
    Table, 
    AllowNull,
    DataType,
    DeletedAt,
    Unique,
    ForeignKey,
    BelongsTo,
    BelongsToMany,
    HasMany
} from 'sequelize-typescript';
import { complement } from './complement'
import { businessUnit } from "./businessUnit";
import { Process } from "./process";
import { Vehicles } from './vehicles';
import { DocVehicles } from './relations/docVehicle';
import { Contract } from './contract';


@Table({
    tableName: 'typeDocVehicle',
    timestamps: true
})
export class typeDocVehicles extends Model<typeDocVehicles, complement> {

    @AllowNull(false)
    @Column({type: DataType.STRING})
    name: string;

    @AllowNull(false)
    @Column({type: DataType.STRING})
    description: string;

    @DeletedAt
    @Column({type: DataType.DATE})
    deleteAt: Date

    @AllowNull(false)
    @Column({type: DataType.BOOLEAN, defaultValue: true })
    status: boolean

    @Unique(true)
    @Column({type: DataType.STRING})
    unique_id: string 

    @AllowNull(false)
    // @ts-ignore 
    @ForeignKey(() => businessUnit)
    @Column
    businessId: number;
      
    // @ts-ignore 
    @BelongsTo(() => businessUnit)
    business: businessUnit;

    //@ts-ignore
    @BelongsToMany(() => Vehicles, () => DocVehicles)
    vehicles: Vehicles

    @AllowNull(true)
    // @ts-ignore 
    @ForeignKey(() => Contract)
    @Column
    contractId: number;
      
    // @ts-ignore 
    @BelongsTo(() => Contract)
    contract: Contract;

    @AllowNull(true)
    // @ts-ignore 
    @ForeignKey(() => Process)
    @Column
    processId: number;
          
    // @ts-ignore 
    @BelongsTo(() => Process)
    process: Process; 

}