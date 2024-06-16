import { Module } from '@nestjs/common'
import { CountryService } from '../services/country.service'
import { CountryController } from '../controllers/country.controller'
import { Country } from '../entities/country.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
	controllers: [CountryController],
	providers: [CountryService],
	exports: [TypeOrmModule],
	imports: [TypeOrmModule.forFeature([Country])]
})
export class CountryModule {}
