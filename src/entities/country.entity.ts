import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { State } from './state.entity'

@Entity({ name: 'countries' })
export class Country {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column()
	code: string

	@OneToMany(() => State, state => state.country)
	states: State[]
}
