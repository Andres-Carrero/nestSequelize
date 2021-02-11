import { businessUnit } from "src/models/model/businessUnit";
import { complement } from "src/models/model/complement";

export interface TennanDto 
extends complement{
  name: string;
  state: string
  business: businessUnit[];
  deleteAt: Date
  status: boolean
  unique_id: string 
}