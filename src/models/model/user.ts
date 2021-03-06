import { Column,Model,Table,Unique,DataType,AllowNull,DeletedAt,BelongsToMany,HasMany} from 'sequelize-typescript';
import { complement } from "./complement";
import { roles } from "./role";
import { configUsers } from "./configUser";
import { businessUnit } from "./businessUnit";
import { userRole } from './relations/userRole';
import { businessUser } from './relations/businessUser';

@Table({
    tableName: 'user',
    timestamps: true
})
export class users extends Model<users, complement>{

    @AllowNull(false)
    @Column({type: DataType.STRING})
    firstName: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    lastName: string

    @Unique(true)
    @AllowNull(false)
    @Column({type: DataType.STRING})
    email: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    birth_date: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    password: string

    //@ts-ignore
    @BelongsToMany(() => roles, () => userRole)
    roles: roles

    //@ts-ignore
    @BelongsToMany(() => businessUnit, () => businessUser)
    business: businessUnit

    // @ts-ignore
    @HasMany(() => configUsers)
    user: configUsers[];

    @DeletedAt
    @Column({type: DataType.DATE})
    deleteAt: Date

    @Column({type: DataType.BOOLEAN, defaultValue: true })
    status: boolean

    @Unique(true)
    @Column({type: DataType.STRING})
    unique_id: string 

    

}
