import { Migration } from '@mikro-orm/migrations';

export class Migration20210815205459 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "time_entry" ("id" serial primary key, "started_at" jsonb not null, "ended_at" jsonb not null, "title" varchar(255) not null, "description" varchar(255) not null);');
  }

}
