import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete
} from '@nestjs/common'
import { StateService } from '../services/state.service'
import { CreateStateDto } from '../dto/create-dto/create-state.dto'
import { UpdateStateDto } from '../dto/update-dto/update-state.dto'

@Controller('state')
export class StateController {
	constructor(private readonly stateService: StateService) {}

	@Post()
	create(@Body() createStateDto: CreateStateDto) {
		return this.stateService.create(createStateDto)
	}

	@Get()
	findAll() {
		return this.stateService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.stateService.findOne(+id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateStateDto: UpdateStateDto) {
		return this.stateService.update(+id, updateStateDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.stateService.remove(+id)
	}
}
