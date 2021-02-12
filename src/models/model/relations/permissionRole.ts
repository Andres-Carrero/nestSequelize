import { 
    Column, 
    Model, 
    Table, 
    Unique, 
    ForeignKey,
    DataType,
    DeletedAt,
    AllowNull,
    BelongsToMany
} from 'sequelize-typescript';

import { roles } from "../role";
import { permission } from '../permission';

@Table({
    tableName: 'permissionRole',
    timestamps: true
})
export class permissionRole extends Model{

    //@ts-ignore
    @ForeignKey(() => permission)
    @Column
    permissionId: number;
  
    //@ts-ignore
    @ForeignKey(() => roles)
    @Column
    roleId: number;




}