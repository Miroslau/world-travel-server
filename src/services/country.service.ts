import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { CreateCountryDto } from '../dto/create-dto/create-country.dto'
import { UpdateCountryDto } from '../dto/update-dto/update-country.dto'
import { Repository } from 'typeorm'
import { Country } from '../entities/country.entity'
import { InjectRepository } from '@nestjs/typeorm'
import Pagination from '../interfaces/pagination.interface'
import Sorting from '../interfaces/sorting.interface'
import Filtering from '../interfaces/filtering.interface'
import PaginatedResource from '../dto/resources/paginated-resource.dto'
import { getOrder, getWhere } from '../helpers/helpers'

@Injectable()
export class CountryService {
	constructor(
		@InjectRepository(Country)
		private readonly countryRepository: Repository<Country>
	) {}
	async createCountry(createCountryDto: CreateCountryDto): Promise<Country> {
		const { name, code } = createCountryDto

		const lowerCaseName = name.toLowerCase()
		const lowerCaseCode = code.toLowerCase()

		const [isExistByName, isExistByCode] = await Promise.all([
			this.countryRepository.findBy({ name: lowerCaseName }),
			this.countryRepository.findBy({ code: lowerCaseCode })
		])

		if (isExistByName.length || isExistByCode.length) {
			throw new BadRequestException(`The country has already been added`)
		}

		return await this.countryRepository.save({
			name: createCountryDto.name.toLowerCase(),
			code: createCountryDto.code.toLowerCase()
		})
	}

	async getAllCountries(
		{ page, limit, size, offset }: Pagination,
		sort?: Sorting,
		filter?: Filtering
	): Promise<PaginatedResource<Partial<Country>>> {
		const where = getWhere(filter)
		const order = getOrder(sort)

		const [countries, total] = await this.countryRepository.findAndCount({
			where,
			order,
			take: limit,
			skip: offset
		})

		return {
			totalItems: total,
			items: countries,
			page,
			size
		}
	}

	async getCountryById(id: number) {
		const country = await this.countryRepository.findOneBy({
			id: id
		})

		if (!country) {
			throw new NotFoundException(`The Country by id: ${id} has not been found`)
		}

		return country
	}

	async updateCounty(
		id: number,
		updateCountryDto: UpdateCountryDto
	): Promise<Country> {
		const country = await this.countryRepository.findOne({
			where: { id }
		})

		if (!country) {
			throw new NotFoundException(`The Country by id: ${id} has not been found`)
		}

		await this.countryRepository.update(id, updateCountryDto)

		return await this.getCountryById(id)
	}

	async deleteCountry(id: number) {
		const country = await this.countryRepository.findOne({
			where: { id }
		})

		if (!country) {
			throw new NotFoundException(`The Country by id: ${id} has not been found`)
		}

		await this.countryRepository.delete(id)

		return id
	}
}
