import { Test, TestingModule } from '@nestjs/testing'
import { CityController } from '../../controllers/city.controller'
import { CityService } from '../../services/city.service'

describe('CityController', () => {
	let controller: CityController

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [CityController],
			providers: [CityService]
		}).compile()

		controller = module.get<CityController>(CityController)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
