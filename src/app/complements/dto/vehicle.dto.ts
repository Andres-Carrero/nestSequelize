import { complement } from "src/models/model/complement";

export class vehicleDto 
extends complement {
    Type: string    //tipo
    brand: string   //marca
    Model: string   //modelo
    color: string
    licensePlate: string    //placa
    cylinder: string    //cilindraje
    bodywork: string    //carroceria
    chassis: string     //chasis
    fuelType: string    //tipo de combustible
    capacity: string    //capacidad
    engine: string      //motor
    line: string        //linea
    CurrentMileage: number      //Kilometraje actual     
    maintenanceMileage: number  //mantenimiento kilometraje

    typeContract: string    //tipo de contrato
    contractValue: string   //valor de contrato
    company: string     //compañia / empresa
    services: string    //servicios
    transitAgency: string   //organismo de transito
    import: string      //importacion
    importDate: Date    //fecha de importacion
    dateAdmission: Date     //fecha de ingrso
    dateDischarge: Date     //fecha de egreso
    dateEnrollment: Date    //fecha de matricula
    vin: string     
    trafficLicense: string      //licencia de transito

    businessId: number
    contractId: number
    processId: number

    deleteAt: Date
    status: boolean
    unique_id: string 
}