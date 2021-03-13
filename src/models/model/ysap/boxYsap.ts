import { Column,Model,Table,Unique,DataType,AllowNull,DeletedAt,HasMany,ForeignKey,BelongsTo} from 'sequelize-typescript';
import { addressYsap } from './addressYsap';
import { boxPaymentYsap } from './boxPayments';
import { buttonsGenerateYsap } from './buttonsYsap';
import { buttonYsap } from './buttonYsap';
import { statusYsap } from './statusYsap';
import { usersYsap } from './userYsap';


@Table({
    tableName: 'ysapBox',
    timestamps: true
})
export class BoxYsap extends Model<BoxYsap>{

    @AllowNull(false)
    @Column({type: DataType.STRING})
    title: string

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

    @AllowNull(false) // @ts-ignore 
    @ForeignKey(() => usersYsap)
    @Column
    userId: number;

    // @ts-ignore 
    @BelongsTo(() => usersYsap)
    User: usersYsap;

    @DeletedAt
    @Column({type: DataType.DATE})
    deleteAt: Date

    @Unique(true)
    @Column({type: DataType.STRING})
    unique_id: string 

    // @ts-ignore 
    @HasMany(() => boxPaymentYsap)
    boxsPayments: boxPaymentYsap;

    @AllowNull(false) // @ts-ignore 
    @ForeignKey(() => addressYsap)
    @Column
    addressId: number;
      
    // @ts-ignore 
    @BelongsTo(() => addressYsap)
    address: addressYsap;


}