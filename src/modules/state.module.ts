import { Module } from '@nestjs/common'
import { StateService } from '../services/state.service'
import { StateController } from '../controllers/state.controller'

@Module({
	controllers: [StateController],
	providers: [StateService]
})
export class StateModule {}
