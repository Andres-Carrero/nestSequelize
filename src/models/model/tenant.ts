import { 
    Column, 
    Model, 
    Table, 
    Unique, 
    ForeignKey,
    DataType,
    DeletedAt,
    HasMany,
    AllowNull,
    BelongsToMany
} from 'sequelize-typescript';
import { complement } from "./complement";
import { businessUnit } from "./businessUnit";
import { users } from './user';
import { roles } from "./role";

@Table({
    tableName: 'tenant',
    timestamps: true
})
export class tenant extends Model<tenant, complement> {

    @Column({type: DataType.STRING})
    name: string

    @Column({type: DataType.STRING})
    state: string

    // @ts-ignore
    @HasMany(() => businessUnit)
    business: businessUnit[];
    
    @DeletedAt
    @Column({type: DataType.DATE})
    deleteAt: Date

    @Column({type: DataType.BOOLEAN, defaultValue: true })
    status: boolean

    @Unique(true)
    @Column({type: DataType.STRING})
    unique_id: string 

}