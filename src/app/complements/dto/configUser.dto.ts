import { complement } from "src/models/model/complement";
import { users } from "src/models/model/user";

export interface ConfigUsersDto 
extends complement {
    language: string
    time_zone: Date  
    country: string
    user: users;
    deleteAt: Date
    status: boolean
    unique_id: string  
    userId: number
}