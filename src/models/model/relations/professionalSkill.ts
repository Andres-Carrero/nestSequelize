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
import { TypeSkills } from '../typeSkills';
import { professionals } from '../professionals';

@Table({
    tableName: 'professionalSkill',
    timestamps: true
})
export class professionalSkill extends Model {

    //@ts-ignore
    @ForeignKey(() => professionals)
    @Column
    professionalId: number;
  
    //@ts-ignore
    @ForeignKey(() => TypeSkills)
    @Column
    TypeSkillId: number;

}