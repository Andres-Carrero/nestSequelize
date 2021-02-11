import { businessUser } from "src/models/model/businessUser";
import { complement } from "src/models/model/complement";
import { configUsers } from "src/models/model/configUser";
import { roles } from "src/models/model/role";


export class UsersDto 
extends complement {
    firstName: string;
    lastName: string;
    email: string;
    birth_date: string;
    password: string;
    roles: roles;
    business: businessUser;
    configId: number;
    config: configUsers;
    deleteAt: Date
    status: boolean
    unique_id: string 
}
















export class userRoleDto{
    a: number 
    b: number 
    c: number 
    d: number
    e: number
}



export class permissionRoleDto{
    id_roles: number
    id_permission: number
}