import { complement } from "src/models/model/complement";
import { businessUnit } from "src/models/model/businessUnit";
import { Departments } from "src/models/model/departments";

export class cityDto 
extends complement {
    name: string;
    description: string;
    deleteAt: Date
    status: boolean
    unique_id: string 
    departmentsId:number
    departments: Departments

}