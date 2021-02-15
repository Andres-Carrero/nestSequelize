import { complement } from "src/models/model/complement";
import { businessUnit } from "src/models/model/businessUnit";
import { Process } from "src/models/model/process";

export class contractDto 
extends complement {
    name: string;
    description: string;
    deleteAt: Date
    status: boolean
    unique_id: string 
    businessId:number
    business: businessUnit
    process: Process
}