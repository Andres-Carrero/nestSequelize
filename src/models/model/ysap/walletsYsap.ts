import { Column,Model,Table,Unique,DataType,AllowNull,DeletedAt,BelongsToMany,ForeignKey, BelongsTo} from 'sequelize-typescript';
import { addressYsap } from './addressYsap';
import { statusYsap } from './statusYsap';
import { usersYsap } from './userYsap';


@Table({
    tableName: 'ysapWallets',
    timestamps: true
})
export class WalletsYsap extends Model<WalletsYsap>{

    @Unique(true)
    @Column({type: DataType.STRING})
    unique_id: string 

    @AllowNull(false)
    @Column({type: DataType.STRING})
    name: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    slug: string

    @DeletedAt
    @Column({type: DataType.DATE})
    deleteAt: Date

    @AllowNull(false) // @ts-ignore 
    @ForeignKey(() => usersYsap)
    @Column
    userId: number;
      
    // @ts-ignore 
    @BelongsTo(() => usersYsap)
    user: usersYsap;

    @AllowNull(false) // @ts-ignore 
    @ForeignKey(() => statusYsap)
    @Column
    statusId: number;
      
    // @ts-ignore 
    @BelongsTo(() => statusYsap)
    status: statusYsap;


    

}