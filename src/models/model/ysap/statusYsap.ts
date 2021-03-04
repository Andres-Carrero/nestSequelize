import { Column,Model,Table,Unique,DataType,AllowNull,HasMany,ForeignKey,BelongsTo} from 'sequelize-typescript';
import { buttonYsap } from './buttonYsap';
import { thirdWalletYsap } from './thirdWalletYsap';
import { usersYsap } from './userYsap';


@Table({
    tableName: 'ysapStatus',
    timestamps: true
})
export class statusYsap extends Model<statusYsap>{

    @Unique(true)
    @AllowNull(false)
    @Column({type: DataType.STRING})
    name: string

    // @ts-ignore 
    @HasMany(() => buttonYsap)
    button: buttonYsap;




}