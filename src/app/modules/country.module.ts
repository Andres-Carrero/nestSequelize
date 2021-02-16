import { CountryController } from './../controllers/country.controller';
import { CountryService } from './../services/country.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Country } from 'src/models/model/country';

@Module({
    imports: [
        SequelizeModule.forFeature([
            Country,
        ]),
    ],
    controllers: [
        CountryController,],
    providers: [
        CountryService,],
})
export class CountryModule { }
