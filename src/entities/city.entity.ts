import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { State } from './state.entity'

@Entity({ name: 'cities' })
export class City {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@ManyToOne(() => State, state => state.cities)
	state: State
}
