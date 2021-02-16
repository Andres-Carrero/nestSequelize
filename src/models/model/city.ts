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
import { Commune } from './commune';
import { complement } from './complement'
import { Departments } from "./departments";


@Table({
    tableName: 'City',
    timestamps: true
})
export class City extends Model<City, complement> {

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
    @ForeignKey(() => Departments)
    @Column
    departmentsId: number;
      
    // @ts-ignore 
    @BelongsTo(() => Departments)
    departments: Departments;

    // @ts-ignore 
    @HasMany(() => Commune)
    Commune: Commune;
        
}