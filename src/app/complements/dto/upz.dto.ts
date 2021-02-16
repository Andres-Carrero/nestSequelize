import { Commune } from "src/models/model/commune";
import { complement } from "src/models/model/complement";

export class upzDto 
extends complement {
    name: string;
    description: string;
    deleteAt: Date
    status: boolean
    unique_id: string 
    CommuneId:number
    Commune: Commune
}