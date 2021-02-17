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
import { DocVehicles } from './relations/docVehicle';
import { Contract } from './contract';


@Table({
    tableName: 'Vehicle',
    timestamps: true
})
export class Vehicles extends Model<Vehicles, complement> {

    @AllowNull(false)
    @Column({type: DataType.STRING})
    Type: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    brand: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    Model: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    color: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    licensePlate: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    cylinder: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    bodywork: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    chassis: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    fuelType: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    capacity: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    engine: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    line: string

    @AllowNull(false)
    @Column({type: DataType.INTEGER})
    CurrentMileage: number

    @AllowNull(false)
    @Column({type: DataType.INTEGER})
    maintenanceMileage: number

    @AllowNull(false)
    @Column({type: DataType.STRING})
    typeContract: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    contractValue: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    company: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    services: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    transitAgency: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    import: string

    @AllowNull(true)
    @Column({type: DataType.DATE})
    importDate: Date

    @AllowNull(true)
    @Column({type: DataType.DATE})
    dateAdmission: Date

    @AllowNull(true)
    @Column({type: DataType.DATE})
    dateDischarge: Date

    @AllowNull(true)
    @Column({type: DataType.DATE})
    dateEnrollment: Date

    @AllowNull(false)
    @Column({type: DataType.STRING})
    vin: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    trafficLicense: string

    @AllowNull(false)
    // @ts-ignore 
    @ForeignKey(() => businessUnit)
    @Column
    businessId: number;
          
    // @ts-ignore 
    @BelongsTo(() => businessUnit)
    business: businessUnit;

    //@ts-ignore
    @BelongsToMany(() => typeDocVehicles, () => DocVehicles)
    docVehicles: typeDocVehicles

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

    @DeletedAt
    @Column({type: DataType.DATE})
    deleteAt: Date

    @AllowNull(false)
    @Column({type: DataType.BOOLEAN, defaultValue: true })
    status: boolean

    @Unique(true)
    @Column({type: DataType.STRING})
    unique_id: string 
}