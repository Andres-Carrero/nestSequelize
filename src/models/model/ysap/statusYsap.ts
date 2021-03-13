import { Column,Model,Table,Unique,DataType,AllowNull,HasMany,ForeignKey,BelongsTo} from 'sequelize-typescript';
import { BoxYsap } from './boxYsap';
import { buttonsGenerateYsap } from './buttonsYsap';
import { buttonYsap } from './buttonYsap';
import { thirdWalletYsap } from './thirdWalletYsap';
import { usersYsap } from './userYsap';
import { WalletsYsap } from './walletsYsap';


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
    buttonPayment: buttonYsap;

    // @ts-ignore 
    @HasMany(() => buttonsGenerateYsap)
    button: buttonsGenerateYsap;

    // @ts-ignore 
    @HasMany(() => BoxYsap)
    box: BoxYsap;

    // @ts-ignore 
    @HasMany(() => WalletsYsap)
    wallets: WalletsYsap;


}