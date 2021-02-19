import { complement } from "src/models/model/complement";

export class workflowHeadDto 
extends complement {
    name: string;
    description: string;
    deleteAt: Date
    status: boolean
    businessId: number
    unique_id: string 
}


export class workflowStageDto 
extends complement {
    name: string;
    description: string;
    order: string
    deleteAt: Date
    status: boolean
    WorkflowHeadId: number
    unique_id: string 
}


export class workflowTypeActionDto 
extends complement {
    name: string;
    description: string;
    icon: string
    deleteAt: Date
    status: boolean
    WorkflowHeadId: number
    unique_id: string 
}

export class workflowDto 
extends complement {
    name: string;
    description: string;
    deleteAt: Date
    status: boolean
    businessId: number
    unique_id: string 
    WorkflowStage: [{
        nameStage: string;
        unique_id: string
        delete: boolean
        descriptionStage: string;
        orderStage: string  
        typeActionId: number
        typeAction: [{
            typeActionId:number
            statusType:boolean
            //nameType:string
            //descriptionType:string
            //iconType:string
        }]
    }]
}