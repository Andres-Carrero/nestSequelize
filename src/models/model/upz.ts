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
import { Commune } from './commune';


@Table({
    tableName: 'Upz',
    timestamps: true
})
export class Upz extends Model<Upz, complement> {

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
    @ForeignKey(() => Commune)
    @Column
    CommuneId: number;
      
    // @ts-ignore 
    @BelongsTo(() => Commune)
    Commune: Commune;

    
        
}