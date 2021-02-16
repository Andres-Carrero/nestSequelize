import { businessUnit } from "src/models/model/businessUnit";
import { complement } from "src/models/model/complement";
import { Country } from "src/models/model/country";

export class parameterDto 
extends complement {
    name: string;
    value: string;
    deleteAt: Date
    status: boolean
    unique_id: string 
    businessId:number
    business: businessUnit

}