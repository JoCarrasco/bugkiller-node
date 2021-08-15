import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class TimeEntry {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: 'date' })
  startedAt = new Date();

  @Field(() => String)
  @Property({ type: 'date' })
  endedAt = new Date();

  @Field()
  @Property({ type: 'text' })
  title!: string;

  @Field()
  @Property({ type: 'text' })
  description!: string;
}