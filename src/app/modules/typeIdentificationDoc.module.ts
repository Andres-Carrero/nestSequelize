import { TypeIdentificationDocController } from './../controllers/typeidentificationdoc.controller';
import { TypeIdentificationDocService } from './../services/typeidentificationdoc.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { typeIdentificationDocument } from 'src/models/model/typeDocIdentification';
import { typeServices } from 'src/models/model/typesServices';

@Module({
    imports: [
        SequelizeModule.forFeature([
            typeIdentificationDocument,
        ]),
    ],
    controllers: [
        TypeIdentificationDocController,],
    providers: [
        TypeIdentificationDocService,],
})
export class TypeIdentificationDocModule { }
