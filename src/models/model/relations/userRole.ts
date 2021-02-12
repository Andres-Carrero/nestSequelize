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
import { users } from '../user';
import { roles } from "../role";

@Table({
    tableName: 'userRole',
    timestamps: true
})
export class userRole extends Model{

    //@ts-ignore
    @ForeignKey(() => users)
    @Column
    userId: number;
  
    //@ts-ignore
    @ForeignKey(() => roles)
    @Column
    roleId: number;


}