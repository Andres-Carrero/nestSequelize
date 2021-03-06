import { 
    Column, 
    Model,
    Table, 
    AllowNull,
    DataType,
    DeletedAt,
    Unique,
    ForeignKey,
    BelongsTo,
    BelongsToMany,
    HasMany
} from 'sequelize-typescript';
import { complement } from './complement'
import { businessUnit } from "./businessUnit";
import { WorkflowStage } from './workflowStages';


@Table({
    tableName: 'WorkflowHead',
    timestamps: true
})
export class WorkflowHead extends Model<WorkflowHead, complement> {

    @AllowNull(false)
    @Column({type: DataType.STRING})
    name: string;

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
    @ForeignKey(() => businessUnit)
    @Column
    businessId: number;
      
    // @ts-ignore 
    @BelongsTo(() => businessUnit)
    business: businessUnit;

    // @ts-ignore
    @HasMany(() => WorkflowStage)
    WorkflowStage: WorkflowStage[];


        
}