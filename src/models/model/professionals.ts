import { 
    Column,
    Model,
    Table,
    Unique,
    DataType,
    AllowNull,
    DeletedAt,
    BelongsToMany,
    ForeignKey,
    BelongsTo,} from 'sequelize-typescript';
import { complement } from "./complement";
import { businessUnit } from "./businessUnit";
import { typeIdentificationDocument } from './typeDocIdentification';
import { TypeSkills } from './typeSkills';
import { professionalSkill } from "./relations/professionalSkill";
import { Crew } from './crew';
import { crewProfessional } from "./relations/crewProfessional";
import { TypeProfessional } from "./typeProfessional";

@Table({
    tableName: 'professional',
    timestamps: true
})
export class professionals extends Model<professionals, complement>{

    @AllowNull(false)
    @Column({type: DataType.STRING})
    names: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    surnames: string

    @Unique(true)
    @AllowNull(false)
    @Column({type: DataType.INTEGER})
    idetification: number

    @Unique(true)
    @AllowNull(false)
    @Column({type: DataType.STRING})
    email: string

    //@Unique(true)
    @AllowNull(false)
    @Column({type: DataType.STRING})
    phone: number

    //@Unique(true)
    @AllowNull(false)
    @Column({type: DataType.STRING})
    direction: string

    @DeletedAt
    @Column({type: DataType.DATE})
    deleteAt: Date

    @Column({type: DataType.BOOLEAN})
    is_Supervisor: boolean

    @Column({type: DataType.BOOLEAN})
    is_senior: boolean

    @Column({type: DataType.BOOLEAN})
    is_junior: boolean

    @Column({type: DataType.BOOLEAN, defaultValue: true })
    status: boolean

    @Unique(true)
    @Column({type: DataType.STRING})
    unique_id: string 

    @AllowNull(false)
    // @ts-ignore 
    @ForeignKey(() => businessUnit)
    @Column
    businessId: number;
      
    // @ts-ignore 
    @BelongsTo(() => businessUnit)
    business: businessUnit;

    // @ts-ignore 
    @ForeignKey(() => typeIdentificationDocument)
    @Column
    typeDocumentId: number;
      
    // @ts-ignore 
    @BelongsTo(() => typeIdentificationDocument)
    typeDocument: typeIdentificationDocument;

    //@ts-ignore
    @BelongsToMany(() => TypeSkills, () => professionalSkill)
    TypeSkills: TypeSkills

    //@ts-ignore
    @BelongsToMany(() => Crew, () => crewProfessional)
    Crew: Crew

    // @ts-ignore 
    @ForeignKey(() => TypeProfessional)
    @Column
    typeProfessionaId: number;
          
    // @ts-ignore 
    @BelongsTo(() => TypeProfessional)
    typeProfessional: TypeProfessional;
    


    

}