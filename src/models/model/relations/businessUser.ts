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
import { complement } from "../complement";
import { businessUnit } from "../businessUnit";
import { users } from '../user';
import { roles } from "../role";

@Table({
    tableName: 'businessUser',
    timestamps: true
})
export class businessUser extends Model {

    //@ts-ignore
    @ForeignKey(() => users)
    @Column
    userId: number;
  
    //@ts-ignore
    @ForeignKey(() => businessUnit)
    @Column
    businessId: number;

}