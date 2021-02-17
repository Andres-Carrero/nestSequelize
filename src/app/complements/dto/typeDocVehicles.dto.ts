import { complement } from "src/models/model/complement";

export class typeDocVehicleDto 
extends complement {
    name: string
    descripcion: string

    businessId: number
    contractId: number
    processId: number

    deleteAt: Date
    status: boolean
    unique_id: string 
}