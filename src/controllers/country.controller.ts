import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	HttpCode,
	HttpStatus,
	ValidationPipe,
	UsePipes
} from '@nestjs/common'
import { CountryService } from '../services/country.service'
import { CreateCountryDto } from '../dto/create-dto/create-country.dto'
import { UpdateCountryDto } from '../dto/update-dto/update-country.dto'
import Pagination from '../interfaces/pagination.interface'
import { Country } from '../entities/country.entity'
import PaginationParams from '../params/pagination.params'
import SortingParams from '../params/sorting.params'
import Sorting from '../interfaces/sorting.interface'
import Filtering from '../interfaces/filtering.interface'
import FilteringParams from '../params/filtering.params'
import PaginatedResource from '../dto/resources/paginated-resource.dto'

@Controller('country')
export class CountryController {
	constructor(private readonly countryService: CountryService) {}

	@Post()
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	create(@Body() createCountryDto: CreateCountryDto) {
		return this.countryService.createCountry(createCountryDto)
	}

	@Get()
	@HttpCode(HttpStatus.OK)
	getAllCountries(
		@PaginationParams() paginationParams: Pagination,
		@SortingParams(['name', 'id']) sort?: Sorting,
		@FilteringParams(['name', 'id']) filter?: Filtering
	): Promise<PaginatedResource<Partial<Country>>> {
		return this.countryService.getAllCountries(paginationParams, sort, filter)
	}

	@Get(':id')
	getCountryById(@Param('id') id: number): Promise<Country> {
		return this.countryService.getCountryById(id)
	}

	@Patch(':id')
	updateCounty(
		@Param('id') id: number,
		@Body() updateCountryDto: UpdateCountryDto
	) {
		return this.countryService.updateCounty(id, updateCountryDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.countryService.remove(+id)
	}
}
