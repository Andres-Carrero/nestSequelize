import { 
    Column, 
    Model,
    Table, 
    AllowNull,
    DataType,
    ForeignKey,
    BelongsTo,
    DeletedAt,
    Unique,
    HasMany
} from 'sequelize-typescript';
import { complement } from './complement'
import { Contract } from "./contract";


@Table({
    tableName: 'Process',
    timestamps: true
})
export class Process extends Model<Process, complement> {

    @AllowNull(false)
    @Column({type: DataType.STRING})
    description: string;

    @DeletedAt
    @Column({type: DataType.DATE})
    deleteAt: Date

    @Column({type: DataType.BOOLEAN, defaultValue: true })
    status: boolean

    @Unique(true)
    @Column({type: DataType.STRING})
    unique_id: string 


    // @ts-ignore 
    @ForeignKey(() => Contract)
    @Column
    contractId: number;
          
    // @ts-ignore 
    @BelongsTo(() => Contract)
    contract: Contract;

    
}