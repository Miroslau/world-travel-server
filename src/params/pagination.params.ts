import {
	BadRequestException,
	createParamDecorator,
	ExecutionContext
} from '@nestjs/common'
import Pagination from '../interfaces/pagination.interface'
import { Request } from 'express'

const PaginationParams = createParamDecorator(
	(data, ctx: ExecutionContext): Pagination => {
		const request: Request = ctx.switchToHttp().getRequest()
		const page = parseInt(request.query.page as string)
		const size = parseInt(request.query.size as string)

		if (isNaN(page) || page < 0 || isNaN(size) || size < 0) {
			throw new BadRequestException('Invalid pagination params')
		}

		if (size > 100) {
			throw new BadRequestException(
				'Invalid pagination params: Max size is 100'
			)
		}

		const limit = size
		const offset = page * limit

		return {
			page,
			limit,
			size,
			offset
		}
	}
)

export default PaginationParams
