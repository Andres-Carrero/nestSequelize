import { Column,Model,Table,Unique,DataType,AllowNull,DeletedAt,BelongsToMany,HasMany} from 'sequelize-typescript';
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
    @HasMany(() => buttonYsap)
    Buttons: buttonYsap;

    @DeletedAt
    @Column({type: DataType.DATE})
    deleteAt: Date

    @Column({type: DataType.BOOLEAN, defaultValue: true })
    status: boolean

    @Unique(true)
    @Column({type: DataType.STRING})
    unique_id: string 

    

}