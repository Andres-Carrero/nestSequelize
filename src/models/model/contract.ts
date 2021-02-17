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
import { typeDocVehicles } from './typeDocVehicles';
import { Vehicles } from './vehicles';


@Table({
    tableName: 'Contract',
    timestamps: true
})
export class Contract extends Model<Contract, complement> {

    @AllowNull(false)
    @Column({type: DataType.STRING})
    name: string;

    @AllowNull(false)
    @Column({type: DataType.STRING})
    description: string;

    @DeletedAt
    @Column({type: DataType.DATE})
    deleteAt: Date

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

    // @ts-ignore 
    @HasMany(() => Process)
    process: Process;

    // @ts-ignore 
    @HasMany(() => typeDocVehicles)
    typeDocVehicles: typeDocVehicles;

    // @ts-ignore 
    @HasMany(() => Vehicles)
    Vehicles: Vehicles;
}