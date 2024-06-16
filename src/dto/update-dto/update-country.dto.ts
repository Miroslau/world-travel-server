import { PartialType } from '@nestjs/mapped-types'
import { CreateCountryDto } from '../create-dto/create-country.dto'

export class UpdateCountryDto extends PartialType(CreateCountryDto) {}
