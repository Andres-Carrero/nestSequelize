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
import { permissionRole } from './permissionRole';
import { roles } from "./role";



@Table({
    tableName: 'permission',
    timestamps: true
})
export class permission extends Model<complement>{
    
    
    @AllowNull(false)
    @Column({type: DataType.STRING})
    name: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    description: string

    //@ts-ignore
    @BelongsToMany(() => roles, () => permissionRole)
    roles: roles

    @DeletedAt
    @Column({type: DataType.DATE})
    deleteAt: Date

    @Column({type: DataType.BOOLEAN, defaultValue: true })
    status: boolean

    @Unique(true)
    @Column({type: DataType.STRING})
    unique_id: string 

}