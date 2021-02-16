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
import { City } from "./city";
import { Upz } from './upz';


@Table({
    tableName: 'Commune',
    timestamps: true
})
export class Commune extends Model<Commune, complement> {

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
    @ForeignKey(() => City)
    @Column
    CityId: number;
      
    // @ts-ignore 
    @BelongsTo(() => City)
    City: City;

    // @ts-ignore 
    @HasMany(() => Upz)
    Countrys: Upz;
        
}