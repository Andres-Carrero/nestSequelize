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
import { WorkflowHead } from './workflowHead';
import { workflowTypeAction } from './workflowTypeAction';
import { workflowStageAction } from './relations/workflowStageAction';


@Table({
    tableName: 'WorkflowStage',
    timestamps: true
})
export class WorkflowStage extends Model<WorkflowStage, complement> {

    @AllowNull(false)
    @Column({type: DataType.STRING})
    name: string;

    @AllowNull(false)
    @Column({type: DataType.STRING})
    description: string;

    @AllowNull(false)
    @Column({type: DataType.STRING})
    order: string;

    @DeletedAt
    @Column({type: DataType.DATE})
    deleteAt: Date

    @Column({type: DataType.BOOLEAN, defaultValue: true })
    status: boolean

    @Unique(true)
    @Column({type: DataType.STRING})
    unique_id: string 

    //@ts-ignore
    @ForeignKey(() => WorkflowHead)
    @Column
    WorkflowHeadId: number;
          
    // @ts-ignore 
    @BelongsTo(() => WorkflowHead)
    WorkflowHead: WorkflowHead;

    //@ts-ignore
    @BelongsToMany(() => workflowTypeAction, () => workflowStageAction)
    typeAction: workflowTypeAction 
        
}