import { 
    Column, 
    Table, 
    UpdatedAt, 
    CreatedAt, 
    PrimaryKey, 
    DataType, 
    Default, 
    AutoIncrement,
    Unique,
    DeletedAt
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';



@Table({
    tableName: 'complement',
    timestamps: true
})
export class complement {

    @PrimaryKey
    @AutoIncrement
    @Column({type: DataType.INTEGER})
    id: Number;

    @CreatedAt
    @Column({type: DataType.DATE})
    createdAt: Date;

    @UpdatedAt
    @Column({type: DataType.DATE})
    updatedAt: Date;
}