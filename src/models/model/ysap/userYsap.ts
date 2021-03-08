import { Column,Model,Table,Unique,DataType,AllowNull,DeletedAt,BelongsToMany,HasMany} from 'sequelize-typescript';
import { addressYsap } from './addressYsap';
import { BoxYsap } from './boxYsap';
import { buttonsGenerateYsap } from './buttonsYsap';
import { buttonYsap } from './buttonYsap';


@Table({
    tableName: 'ysapUsers',
    timestamps: true
})
export class usersYsap extends Model<usersYsap>{

    @AllowNull(false)
    @Column({type: DataType.STRING})
    name: string

    @Unique(true)
    @AllowNull(false)
    @Column({type: DataType.STRING})
    email: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    password: string

    @AllowNull(true)
    @Column({type: DataType.STRING})
    apikey: string


    @AllowNull(false)
    @Column({type: DataType.STRING})
    typeMoney: string

    // @ts-ignore 
    @HasMany(() => addressYsap)
    address: addressYsap;

    // @ts-ignore 
    @HasMany(() => buttonsGenerateYsap)
    buttons: buttonsGenerateYsap;

    // @ts-ignore 
    @HasMany(() => buttonYsap)
    ButtonsPayment: buttonYsap;

    // @ts-ignore 
    @HasMany(() => BoxYsap)
    box: BoxYsap;

    @DeletedAt
    @Column({type: DataType.DATE})
    deleteAt: Date

    @Column({type: DataType.BOOLEAN, defaultValue: true })
    status: boolean

    @Unique(true)
    @Column({type: DataType.STRING})
    unique_id: string 

    

}