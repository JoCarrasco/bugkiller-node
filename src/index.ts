import { MikroORM } from "@mikro-orm/core";
import { MikroORMConfig } from "./config";
import { __prod__ } from "./constants";
import { TimeEntry } from "./entities/TimeEntry";

const main = async () => {
  const orm = await MikroORM.init(MikroORMConfig);
  const entry = orm.em.create(TimeEntry, { title: 'This is a new task', description: 'A task for me' });
  orm.em.persistAndFlush(entry);
};

main();