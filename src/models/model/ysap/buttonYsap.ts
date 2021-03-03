import { Column,Model,Table,Unique,DataType,AllowNull,DeletedAt,BelongsToMany,ForeignKey,BelongsTo} from 'sequelize-typescript';
import { addressYsap } from './addressYsap';
import { usersYsap } from './userYsap';


@Table({
    tableName: 'ysapButton',
    timestamps: true
})
export class buttonYsap extends Model<buttonYsap>{


    @AllowNull(false)
    @Column({type: DataType.STRING})
    title: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    documentCurrency: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    product: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    token: string

    @AllowNull(false)
    @Column({type: DataType.DATE})
    duration: Date

    @AllowNull(false)
    @Column({type: DataType.STRING})
    description: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    values: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    addressId: string;

    @AllowNull(false)
    @Column({type: DataType.STRING})
    TypeCoin: string;


   /* @AllowNull(false) // @ts-ignore 
    @ForeignKey(() => addressYsap)
    @Column
    addressId: number;
      
    // @ts-ignore 
    @BelongsTo(() => addressYsap)
    address: addressYsap;*/

    @AllowNull(false) // @ts-ignore 
    @ForeignKey(() => usersYsap)
    @Column
    txId: number;
      
    // @ts-ignore 
    @BelongsTo(() => usersYsap)
    Users: usersYsap;

    @DeletedAt
    @Column({type: DataType.DATE})
    deleteAt: Date

    @Column({type: DataType.BOOLEAN, defaultValue: true })
    status: boolean

    @Unique(true)
    @Column({type: DataType.STRING})
    unique_id: string 

    

}