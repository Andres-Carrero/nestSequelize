import { businessUser } from "src/models/model/relations/businessUser";
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
    deleteAt: Date
    status: boolean
    unique_id: string 
}
