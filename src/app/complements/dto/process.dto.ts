import { complement } from "src/models/model/complement";
import { Contract } from "src/models/model/contract";

export class processDto 
extends complement {
    description: string;
    deleteAt: Date
    status: boolean
    unique_id: string 
    contractId:number
    contract: Contract
}