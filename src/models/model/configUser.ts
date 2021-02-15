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

} from 'sequelize-typescript';

import { complement } from "./complement";
import { users } from "./user";


export interface configs{
    //language: string;
    //time_zone: Date;
    //country: string;
    //deleteAt: Date
    //status: boolean
    //unique_id: string 
}
@Table({
    tableName: 'configUser',
    timestamps: true
})
export class configUsers extends Model<configUsers, complement> {

    @AllowNull(false)
    @Column({type: DataType.STRING})
    language: string

    @AllowNull(false)
    @Column({type: DataType.DATE})
    time_zone: Date

    @AllowNull(false)
    @Column({type: DataType.STRING})
    country: string

    //@ts-ignore
    @ForeignKey(() => users)
    @Column
    userId: number;
      
    // @ts-ignore 
    @BelongsTo(() => users)
    user: users;

    @DeletedAt
    @Column({type: DataType.DATE})
    deleteAt: Date

    @Column({type: DataType.BOOLEAN, defaultValue: true })
    status: boolean

    @Unique(true)
    @Column({type: DataType.STRING})
    unique_id: string 

}