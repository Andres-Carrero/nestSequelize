import { complement } from "src/models/model/complement";
import { permission } from "src/models/model/permission";
import { users } from "src/models/model/user";

export class RoleDto 
extends complement{
    name: string
    description: string;
    permission: permission
    user: users
    deleteAt: Date
    status: boolean
    unique_id: string 

} 