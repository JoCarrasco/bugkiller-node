import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class TimeEntry {
  @PrimaryKey()
  id!: number;

  @Property({ type: 'date' })
  startedAt = new Date();

  @Property({ type: 'date' })
  endedAt = new Date();

  @Property({ type: 'text' })
  title!: string;

  @Property({ type: 'text' })
  description!: string;
}