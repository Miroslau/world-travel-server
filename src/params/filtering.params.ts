import {
	BadRequestException,
	createParamDecorator,
	ExecutionContext
} from '@nestjs/common'
import Filtering from '../interfaces/filtering.interface'
import { Request } from 'express'
import FilterRule from '../enums/filter-rule.enum'

const FilteringParams = createParamDecorator(
	(data, ctx: ExecutionContext): Filtering => {
		const request: Request = ctx.switchToHttp().getRequest()
		const filter = request.query.filter as string

		if (!filter) {
			return null
		}

		if (typeof data !== 'object') {
			throw new BadRequestException('Invalid filter parameter')
		}

		const filterPatterns = [
			/^[a-zA-Z0-9_]+:(eq|neq|gt|gte|lt|lte|like|nlike|in|nin):[a-zA-Z0-9_,]+$/,
			/^[a-zA-Z0-9_]+:(isnull|isnotnull)$/
		]

		const isValidFilter = filterPatterns.some(pattern => pattern.test(filter))
		if (!isValidFilter) {
			throw new BadRequestException('Invalid filter parameter')
		}

		const [property, rule, value] = filter.split(':')

		if (!data.includes(property)) {
			throw new BadRequestException(`Invalid filter property: ${property}`)
		}

		if (!Object.values(FilterRule).includes(rule as FilterRule)) {
			throw new BadRequestException(`Invalid filter rule: ${rule}`)
		}

		return { property, rule, value }
	}
)

export default FilteringParams
