import { Column,Model,Table,Unique,DataType,AllowNull,DeletedAt,ForeignKey,BelongsTo, HasMany} from 'sequelize-typescript';
import { BoxYsap } from './boxYsap';
import { buttonsGenerateYsap } from './buttonsYsap';
import { buttonYsap } from './buttonYsap';
import { thirdWalletYsap } from './thirdWalletYsap';
import { usersYsap } from './userYsap';


@Table({
    tableName: 'ysapAddress',
    timestamps: true
})
export class addressYsap extends Model<addressYsap>{

    @Unique(true)
    @AllowNull(false)
    @Column({type: DataType.STRING})
    btcAddress: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    tag: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    balance: string
    
    // @ts-ignore 
    @HasMany(() => buttonYsap)
    buttonPayment: buttonYsap;

    // @ts-ignore 
    @HasMany(() => buttonsGenerateYsap)
    button: buttonsGenerateYsap;

    @AllowNull(false) // @ts-ignore 
    @ForeignKey(() => usersYsap)
    @Column
    usersId: number;
      
    // @ts-ignore 
    @BelongsTo(() => usersYsap)
    user: usersYsap;

    @AllowNull(false) // @ts-ignore 
    @ForeignKey(() => thirdWalletYsap)
    @Column
    thirdWalletId: number;
      
    // @ts-ignore 
    @BelongsTo(() => thirdWalletYsap)
    thirdWallet: thirdWalletYsap;

    @DeletedAt
    @Column({type: DataType.DATE})
    deleteAt: Date

    @Column({type: DataType.BOOLEAN, defaultValue: true })
    status: boolean

    @Unique(true)
    @Column({type: DataType.STRING})
    unique_id: string 

    // @ts-ignore 
    @HasMany(() => BoxYsap)
    box: BoxYsap;

    

}