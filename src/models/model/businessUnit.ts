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
    BelongsToMany
} from 'sequelize-typescript';
import { complement } from './complement'
import { tenant } from "./tenant";
import { users } from "./user";
import { businessUser } from './relations/businessUser';

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
    
}