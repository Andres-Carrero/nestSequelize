import { Column,Model,Table,Unique,DataType,AllowNull,DeletedAt,BelongsToMany,HasMany} from 'sequelize-typescript';


@Table({
    tableName: 'ysapPayment',
    timestamps: true
})
export class paymentYsap extends Model<paymentYsap>{


    @AllowNull(false)
    @Column({type: DataType.STRING})
    dateTime: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    nameClient: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    product: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    direction: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    Qrcode: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    docValue: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    typeCoin: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    hash: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    statusTx: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    valueChange: string

    @DeletedAt
    @Column({type: DataType.DATE})
    deleteAt: Date

    @Column({type: DataType.BOOLEAN, defaultValue: true })
    status: boolean

    @Unique(true)
    @Column({type: DataType.STRING})
    idtransaction: string 

    

}