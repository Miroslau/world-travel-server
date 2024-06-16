import { PartialType } from '@nestjs/mapped-types'
import { CreateStateDto } from '../create-dto/create-state.dto'

export class UpdateStateDto extends PartialType(CreateStateDto) {}
