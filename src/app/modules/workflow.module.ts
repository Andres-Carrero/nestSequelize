import { WorkflowController } from './../controllers/workflow.controller';
import { WorkflowService } from './../services/workflow.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { workflowStageAction } from 'src/models/model/relations/workflowStageAction';
import { WorkflowHead } from 'src/models/model/workflowHead';
import { WorkflowStage } from 'src/models/model/workflowStages';
import { workflowTypeAction } from 'src/models/model/workflowTypeAction';
import { WorkflowTypeActionController } from '../controllers/workflowtypeaction.controller';
import { WorkflowTypeActionService } from '../services/workflowtypeaction.service';

@Module({
    imports: [
        SequelizeModule.forFeature([
            WorkflowHead,
            WorkflowStage,
            workflowStageAction,
            workflowTypeAction
        ]),
    ],
    controllers: [
        WorkflowController, WorkflowTypeActionController],
    providers: [
        WorkflowService, WorkflowTypeActionService],
})
export class WorkflowModule { }
