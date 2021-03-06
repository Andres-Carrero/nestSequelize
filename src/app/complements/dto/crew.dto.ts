import { complement } from "src/models/model/complement";
import { City } from "src/models/model/city";

export class crewDto 
extends complement {
    name: string;
    description: string;
    deleteAt: Date
    status: boolean
    is_Supervisor: boolean
    is_senior: boolean
    is_junior: boolean
    unique_id: string 
}