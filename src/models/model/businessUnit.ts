import { 
    Column, 
    Model,
    Table, 
    AllowNull,
    DataType,
    DeletedAt,
    Unique,
    ForeignKey,
    HasOne,
    BelongsTo,
    BelongsToMany,
    HasMany
} from 'sequelize-typescript';
import { complement } from './complement'
import { tenant } from "./tenant";
import { users } from "./user";
import { businessUser } from './relations/businessUser';
import { Contract } from "./contract";
import { typeServices } from './typesServices';
import { roles } from './role';
import { TypeSkills } from './typeSkills';
import { Parameters } from "./Parameters";
import { Country } from "./country";
import { professionals } from './professionals';
import { Vehicles } from './vehicles';
import { typeDocVehicles } from './typeDocVehicles';

@Table({
    tableName: 'businessUnit',
    timestamps: true
})
export class businessUnit extends Model<businessUnit, complement> {

    @AllowNull(false)
    @Column({type: DataType.STRING})
    name: string;

    @AllowNull(false)
    @Column({type: DataType.STRING})
    description: string;

    //@ts-ignore
    @BelongsToMany(() => users, () => businessUser)
    user: users

    //@ts-ignore
    @ForeignKey(() => tenant)
    @Column
    tenantId: number;
      
    // @ts-ignore
    @BelongsTo(() => tenant)
    tenant: tenant;

    @DeletedAt
    @Column({type: DataType.DATE})
    deleteAt: Date

    @Column({type: DataType.BOOLEAN, defaultValue: true })
    status: boolean

    @Unique(true)
    @Column({type: DataType.STRING})
    unique_id: string 

    // @ts-ignore 
    @HasMany(() => Contract)
    contract: Contract;

    // @ts-ignore 
    @HasMany(() => typeServices)
    typeServices: typeServices;

    // @ts-ignore 
    @HasMany(() => typeServices)
    typeDoc: typeServices;

    // @ts-ignore 
    @ForeignKey(() => roles)
    @Column
    roleId: number;
              
    // @ts-ignore 
    @BelongsTo(() => roles)
    role: roles;

    // @ts-ignore 
    @HasMany(() => TypeSkills)
    TypeSkills: TypeSkills;

    // @ts-ignore 
    @HasMany(() => Parameters)
    Parameters: Parameters;

    // @ts-ignore 
    @HasMany(() => Country)
    Countrys: Country;

    // @ts-ignore 
    @HasMany(() => professionals)
    professionals: professionals;

    // @ts-ignore 
    @HasMany(() => typeDocVehicles)
    typeDocVehicles: typeDocVehicles;

    // @ts-ignore 
    @HasMany(() => Vehicles)
    Vehicles: Vehicles;
    
}