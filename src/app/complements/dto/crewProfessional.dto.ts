import { complement } from "src/models/model/complement";
import { City } from "src/models/model/city";

export class crewProfessionalDto 
extends complement {
    is_Supervisor: boolean
    is_senior: boolean
    is_junior: boolean
}