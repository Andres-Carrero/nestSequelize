import { businessUnit } from "src/models/model/businessUnit";
import { complement } from "src/models/model/complement";

export class typeIdentiDocumentDto 
extends complement {
    name: string
    description: string;
    deleteAt: Date
    status: boolean
    unique_id: string 
    businessId:number
    business: businessUnit
}