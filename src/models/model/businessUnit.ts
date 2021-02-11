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
import { configUsers } from "./configUser";
import { users } from "./user";
import { userRole } from './userRole';
import { businessUser } from './businessUser';

@Table({
    tableName: 'businessUnit',
    timestamps: true
})
export class businessUnit extends Model<complement> {

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