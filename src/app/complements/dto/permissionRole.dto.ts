import { complement } from "src/models/model/complement";
import { roles } from "src/models/model/role";

export class PermissionsDto 
extends complement{
    name: string;
    description: string;
    roles: roles
    deleteAt: Date
    status: boolean;
    unique_id: string 
}