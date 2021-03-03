import { Column,Model,Table,Unique,DataType,AllowNull,DeletedAt,BelongsToMany,HasMany} from 'sequelize-typescript';
import { buttonYsap } from './buttonYsap';


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

    /*// @ts-ignore 
    @HasMany(() => buttonYsap)
    Buttons: buttonYsap;*/

    @DeletedAt
    @Column({type: DataType.DATE})
    deleteAt: Date

    @Column({type: DataType.BOOLEAN, defaultValue: true })
    status: boolean

    @Unique(true)
    @Column({type: DataType.STRING})
    unique_id: string 

    

}