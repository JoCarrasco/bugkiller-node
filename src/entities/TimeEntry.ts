import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class TimeEntry {
  @PrimaryKey()
  id!: number;

  @Property()
  startedAt = new Date();

  @Property()
  endedAt = new Date();

  @Property()
  title!: string;

  @Property()
  description!: string;
}