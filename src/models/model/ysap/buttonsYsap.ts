import { Column,Model,Table,Unique,DataType,AllowNull,DeletedAt,ForeignKey,HasMany, BelongsTo} from 'sequelize-typescript';
import { addressYsap } from './addressYsap';
import { buttonYsap } from './buttonYsap';
import { statusYsap } from './statusYsap';
import { usersYsap } from './userYsap';


@Table({
    tableName: 'ysapbuttons',
    timestamps: true
})
export class buttonsGenerateYsap extends Model<buttonsGenerateYsap>{


    @AllowNull(false)
    @Column({type: DataType.STRING})
    name: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    typeCoin: string

    @AllowNull(false) // @ts-ignore 
    @ForeignKey(() => addressYsap)
    @Column
    addressId: number;
      
    // @ts-ignore 
    @BelongsTo(() => addressYsap)
    address: addressYsap;

    @AllowNull(false)
    @Column({type: DataType.STRING})
    description: string

    @DeletedAt
    @Column({type: DataType.DATE})
    deleteAt: Date

    @AllowNull(false) // @ts-ignore 
    @ForeignKey(() => statusYsap)
    @Column
    statusId: number;
      
    // @ts-ignore 
    @BelongsTo(() => statusYsap)
    status: statusYsap;

    @AllowNull(false)
    @Column({type: DataType.STRING})
    success: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    cancel: string

    @Unique(true)
    @Column({type: DataType.STRING})
    unique_id: string 

    // @ts-ignore 
    @HasMany(() => buttonYsap)
    buttonsPayments: buttonYsap;

    @AllowNull(false) // @ts-ignore 
    @ForeignKey(() => usersYsap)
    @Column
    userId: number;
      
    // @ts-ignore 
    @BelongsTo(() => usersYsap)
    user: usersYsap;

    

    

}