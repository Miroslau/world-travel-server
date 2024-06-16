import {
	BadRequestException,
	createParamDecorator,
	ExecutionContext
} from '@nestjs/common'
import Sorting from '../interfaces/sorting.interface'
import { Request } from 'express'

const SortingParams = createParamDecorator(
	(validParams, ctx: ExecutionContext): Sorting => {
		const req: Request = ctx.switchToHttp().getRequest()
		const sort = req.query.sort as string
		if (!sort) return null

		if (typeof validParams !== 'object') {
			throw new BadRequestException('Invalid sort parameter')
		}

		const sortPattern = /^([a-zA-Z0-9]+):(asc|desc)$/
		if (!sort.match(sortPattern)) {
			throw new BadRequestException('Invalid sort parameter')
		}

		const [property, direction] = sort.split(':')

		if (!validParams.includes(property)) {
			throw new BadRequestException(`Invalid sort property: ${property}`)
		}

		return { property, direction }
	}
)

export default SortingParams
