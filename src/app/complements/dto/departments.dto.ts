import { complement } from "src/models/model/complement";
import { Country } from "src/models/model/country";

export class departmentsDto 
extends complement {
    name: string;
    description: string;
    deleteAt: Date
    status: boolean
    unique_id: string 
    countryId:number
    country: Country
}