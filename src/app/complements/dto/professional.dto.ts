import { businessUser } from "src/models/model/relations/businessUser";
import { complement } from "src/models/model/complement";
import { configUsers } from "src/models/model/configUser";
import { roles } from "src/models/model/role";


export class professionalDto 
extends complement {
    names: string;
    surnames: string;
    email: string;
    idetification: number;
    phone: number;
    direction: string;
    businessId: number
    typeDocumentId: number
    if_Supervisor: boolean
    if_senior: boolean
    if_junior: boolean
    typeProfessionaId: number
    deleteAt: Date
    status: boolean
    unique_id: string 
}