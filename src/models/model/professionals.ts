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
import { typeIdentificationDocument } from './type-Identification-Document';
import { TypeSkills } from './typeSkills';
import { professionalSkill } from "./relations/professionalSkill";


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

    @Column({type: DataType.BOOLEAN, defaultValue: true })
    status: boolean

    @Unique(true)
    @Column({type: DataType.STRING})
    unique_id: string 

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


    

}