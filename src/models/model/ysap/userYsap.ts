import { Column,Model,Table,Unique,DataType,AllowNull,DeletedAt,ForeignKey,HasMany,BelongsTo} from 'sequelize-typescript';
import { addressYsap } from './addressYsap';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { BoxYsap } from './boxYsap';
import { buttonsGenerateYsap } from './buttonsYsap';
import { buttonYsap } from './buttonYsap';
import { rolesYsap } from './rolesYsap';
import { statusYsap } from './statusYsap';
import { WalletsYsap } from './walletsYsap';


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
    @IsEmail()
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


    @Unique(true)
    @Column({type: DataType.STRING})
    unique_id: string 

    @AllowNull(false) // @ts-ignore 
    @ForeignKey(() => statusYsap)
    @Column
    statusId: number;
      
    // @ts-ignore 
    @BelongsTo(() => statusYsap)
    status: statusYsap;

    // @ts-ignore 
    @HasMany(() => WalletsYsap)
    wallets: WalletsYsap;

    @AllowNull(false) // @ts-ignore 
    @ForeignKey(() => rolesYsap)
    @Column
    roleId: number;
      
    // @ts-ignore 
    @BelongsTo(() => rolesYsap)
    role: rolesYsap;

    

}