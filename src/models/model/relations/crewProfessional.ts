import { 
    Column, 
    Model, 
    Table, 
    Unique, 
    ForeignKey,
    DataType,
    DeletedAt,
    AllowNull,
    BelongsToMany
} from 'sequelize-typescript';
import { professionals } from '../professionals';
import { Crew } from "../crew";

@Table({
    tableName: 'crewProfessional',
    timestamps: true
})
export class crewProfessional extends Model {

    //@ts-ignore
    @ForeignKey(() => professionals)
    @Column
    professionId: number;
  
    //@ts-ignore
    @ForeignKey(() => Crew)
    @Column
    crewId: number;

}