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


@Table({
    tableName: 'Parameter',
    timestamps: true
})
export class Parameters extends Model<Parameters, complement> {

    @AllowNull(false)
    @Column({type: DataType.STRING})
    name: string;

    @AllowNull(false)
    @Column({type: DataType.STRING})
    value: string;

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
        
}