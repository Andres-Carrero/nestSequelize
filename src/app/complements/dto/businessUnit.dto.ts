import { complement } from "src/models/model/complement";
import { tenant } from "src/models/model/tenant";
import { users } from "src/models/model/user";

export interface BusinessUnitDto
extends complement {
  name: string;
  description: string;
  user: users
  tenantId: number;
  tenant: tenant;
  deleteAt: Date
  status: boolean
  unique_id: string 
}