import { complement } from "src/models/model/complement";
import { City } from "src/models/model/city";

export class communeDto 
extends complement {
    name: string;
    description: string;
    deleteAt: Date
    status: boolean
    unique_id: string 
    cityId:number
    city: City

}