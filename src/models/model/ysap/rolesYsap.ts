import { 
    Column, 
    Model, 
    Table, 
    Unique, 
    DataType,
    DeletedAt,
    AllowNull,
    BelongsTo,
    HasMany,
    ForeignKey
} from 'sequelize-typescript';
import { statusYsap } from './statusYsap';
import { usersYsap } from './userYsap';


@Table({
    tableName: 'ysapRoles',
    timestamps: true
})
export class rolesYsap extends Model<rolesYsap>{
    
    @AllowNull(false)
    @Column({type: DataType.STRING})
    name: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    description: string


    @AllowNull(false) // @ts-ignore 
    @ForeignKey(() => statusYsap)
    @Column
    statusId: number;
      
    // @ts-ignore 
    @BelongsTo(() => statusYsap)
    status: statusYsap;

    // @ts-ignore 
    @HasMany(() => usersYsap)
    ussers: usersYsap;

    @DeletedAt
    @Column({type: DataType.DATE})
    deleteAt: Date


    @Unique(true)
    @Column({type: DataType.STRING})
    unique_id: string 




}