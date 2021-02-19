import { 
    Column, 
    Model, 
    Table, 
    Unique, 
    ForeignKey,
    DataType,
    DeletedAt,
    AllowNull,
    BelongsToMany
} from 'sequelize-typescript';
import { TypeSkills } from '../typeSkills';
import { professionals } from '../professionals';
import { WorkflowStage } from '../workflowStages';
import { workflowTypeAction } from '../workflowTypeAction';

@Table({
    tableName: 'StageAction',
    timestamps: true
})
export class workflowStageAction extends Model {

    //@ts-ignore
    @ForeignKey(() => WorkflowStage)
    @Column
    stageId: number;
  
    //@ts-ignore
    @ForeignKey(() => workflowTypeAction)
    @Column
    typeActionId: number;

    @Column({type: DataType.BOOLEAN, defaultValue: true })
    status: boolean 

}