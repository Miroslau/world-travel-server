import { Module } from '@nestjs/common'
import { CityService } from '../services/city.service'
import { CityController } from '../controllers/city.controller'

@Module({
	controllers: [CityController],
	providers: [CityService]
})
export class CityModule {}
