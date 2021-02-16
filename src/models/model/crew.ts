import { 
    Column, 
    Model,
    Table, 
    AllowNull,
    DataType,
    DeletedAt,
    Unique,
    ForeignKey,
    BelongsTo,
    BelongsToMany,
    HasMany
} from 'sequelize-typescript';
import { complement } from './complement'
import { crewProfessional } from "src/models/model/relations/crewProfessional";
import { professionals } from './professionals';


@Table({
    tableName: 'Crew',
    timestamps: true
})
export class Crew extends Model<Crew, complement> {

    @AllowNull(false)
    @Column({type: DataType.STRING})
    name: string;

    @AllowNull(false)
    @Column({type: DataType.STRING})
    description: string;

    @DeletedAt
    @Column({type: DataType.DATE})
    deleteAt: Date

    @Column({type: DataType.BOOLEAN, defaultValue: true })
    status: boolean

    @Unique(true)
    @Column({type: DataType.STRING})
    unique_id: string 

    //@ts-ignore
    @BelongsToMany(() => professionals, () => crewProfessional)
    professional: professionals
        
}