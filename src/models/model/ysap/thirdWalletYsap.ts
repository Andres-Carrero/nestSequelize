import { Column,Model,Table,Unique,DataType,AllowNull,DeletedAt,BelongsToMany,HasMany} from 'sequelize-typescript';
import { addressYsap } from './addressYsap';


@Table({
    tableName: 'ysapThirdWallet',
    timestamps: true
})
export class thirdWalletYsap extends Model<thirdWalletYsap>{

    @AllowNull(false)
    @Column({type: DataType.STRING})
    name: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    description: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    slug: string

    // @ts-ignore 
    @HasMany(() => addressYsap)
    address: addressYsap;

    @DeletedAt
    @Column({type: DataType.DATE})
    deleteAt: Date

    @Column({type: DataType.BOOLEAN, defaultValue: true })
    status: boolean

    @Unique(true)
    @Column({type: DataType.STRING})
    unique_id: string 

    

}