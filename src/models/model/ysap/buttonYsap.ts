import { Column,Model,Table,Unique,DataType,AllowNull,DeletedAt,BelongsToMany,ForeignKey,BelongsTo} from 'sequelize-typescript';
import { addressYsap } from './addressYsap';
import { BoxYsap } from './boxYsap';
import { buttonsGenerateYsap } from './buttonsYsap';
import { statusYsap } from './statusYsap';
import { usersYsap } from './userYsap';


@Table({
    tableName: 'ysapButtonPayment',
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

    @AllowNull(true) // @ts-ignore 
    @ForeignKey(() => BoxYsap)
    @Column
    boxId: number;
      
    // @ts-ignore 
    @BelongsTo(() => BoxYsap)
    box: BoxYsap;

    @AllowNull(false)
    @Column({type: DataType.STRING})
    TypeCoin: string;


    @AllowNull(false) // @ts-ignore 
    @ForeignKey(() => addressYsap)
    @Column
    addressId: number;
      
    // @ts-ignore 
    @BelongsTo(() => addressYsap)
    address: addressYsap;

    @AllowNull(false) // @ts-ignore 
    @ForeignKey(() => usersYsap)
    @Column
    txId: number;

    @AllowNull(false) // @ts-ignore 
    @ForeignKey(() => statusYsap)
    @Column
    statusId: number;
      
    // @ts-ignore 
    @BelongsTo(() => statusYsap)
    status: statusYsap;
      
    // @ts-ignore 
    @BelongsTo(() => usersYsap)
    Users: usersYsap;

    @DeletedAt
    @Column({type: DataType.DATE})
    deleteAt: Date

    @AllowNull(false) // @ts-ignore 
    @ForeignKey(() => buttonsGenerateYsap)
    @Column
    buttonId: number;
      
    // @ts-ignore 
    @BelongsTo(() => buttonsGenerateYsap)
    button: buttonsGenerateYsap;

 

    @Unique(true)
    @Column({type: DataType.STRING})
    unique_id: string 

    

}