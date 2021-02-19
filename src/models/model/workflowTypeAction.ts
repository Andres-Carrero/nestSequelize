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
import { workflowStageAction } from './relations/workflowStageAction';


@Table({
    tableName: 'workflowTypeAction',
    timestamps: true
})
export class workflowTypeAction extends Model<workflowTypeAction, complement> {

    @AllowNull(false)
    @Column({type: DataType.STRING})
    name: string;

    @AllowNull(false)
    @Column({type: DataType.STRING})
    description: string;

    @AllowNull(false)
    @Column({type: DataType.STRING})
    icon: string;

    @DeletedAt
    @Column({type: DataType.DATE})
    deleteAt: Date

    @Column({type: DataType.BOOLEAN, defaultValue: true })
    status: boolean

    @Unique(true)
    @Column({type: DataType.STRING})
    unique_id: string 

    //@ts-ignore
    @BelongsToMany(() => WorkflowStage, () => workflowStageAction)
    stages: WorkflowStage 
    length: number;
}