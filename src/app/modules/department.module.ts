import { DepartmentService } from './../services/department.service';
import { DepartmentController } from './../controllers/department.controller';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Departments } from 'src/models/model/departments';

@Module({
    imports: [
        SequelizeModule.forFeature([
            Departments,
        ]),
    ],
    controllers: [
        DepartmentController,],
    providers: [
        DepartmentService,],
})
export class DepartmentModule { }
