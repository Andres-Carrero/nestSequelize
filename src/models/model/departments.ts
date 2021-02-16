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
import { Country } from "./country";
import { City } from "./city";


@Table({
    tableName: 'Department',
    timestamps: true
})
export class Departments extends Model<Departments, complement> {

    @AllowNull(false)
    @Column({type: DataType.STRING})
    name: string;

    @DeletedAt
    @Column({type: DataType.DATE})
    deleteAt: Date

    @Column({type: DataType.BOOLEAN, defaultValue: true })
    status: boolean

    @Unique(true)
    @Column({type: DataType.STRING})
    unique_id: string 

    // @ts-ignore 
    @ForeignKey(() => Country)
    @Column
    countryId: number;
      
    // @ts-ignore 
    @BelongsTo(() => Country)
    Country: Country;

    // @ts-ignore 
    @HasMany(() => City)
    Countrys: City;
        
}