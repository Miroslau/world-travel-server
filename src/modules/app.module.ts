import { Module } from '@nestjs/common'
import { AppController } from '../controllers/app.controller'
import { AppService } from '../services/app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CityModule } from './city.module'
import { CountryModule } from './country.module'
import { StateModule } from './state.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.get<string>('DB_HOST'),
				port: configService.get<number>('DB_PORT'),
				username: configService.get<string>('DB_USERNAME'),
				password: configService.get<string>('DB_PASSWORD'),
				database: configService.get<string>('DB_NAME'),
				synchronize: true,
				entities: ['dist/**/*.entity{.ts,.js}']
			}),
			inject: [ConfigService]
		}),
		CityModule,
		CountryModule,
		StateModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
