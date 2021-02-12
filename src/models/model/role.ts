import { 
    Column, 
    Model, 
    Table, 
    Unique, 
    DataType,
    DeletedAt,
    AllowNull,
    BelongsToMany
} from 'sequelize-typescript';
import { complement } from "./complement";
import { users } from "./user";
import { tenant } from "./tenant";
import { userRole } from './relations/userRole';
import { permission } from './permission';
import { permissionRole } from './relations/permissionRole';

@Table({
    tableName: 'role',
    timestamps: true
})
export class roles extends Model<roles, complement>{
    
    @AllowNull(false)
    @Column({type: DataType.STRING})
    name: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    description: string

    //@ts-ignore
    @BelongsToMany(() => users, () => userRole)
    user: users

    //@ts-ignore
    @BelongsToMany(() => permission, () => permissionRole)
    permission: permission


    @DeletedAt
    @Column({type: DataType.DATE})
    deleteAt: Date

    @Column({type: DataType.BOOLEAN, defaultValue: true })
    status: boolean

    @Unique(true)
    @Column({type: DataType.STRING})
    unique_id: string 

}