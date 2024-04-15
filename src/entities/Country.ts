import { Field, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	Entity,
	PrimaryGeneratedColumn,
	Unique,
} from "typeorm";

@ObjectType()
@Entity()
@Unique(["code"])
export class Country extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	code: string;

	@Field()
	@Column()
	name: string;

	@Field()
	@Column()
	emoji: string;
}
