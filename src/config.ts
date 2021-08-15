
import { __prod__ } from "./constants";
import { TimeEntry } from "./entities/time-entry.entity";
import { Options } from '@mikro-orm/core';
import path from 'path';

// Mikro ORM configuration section
export const MikroORMConfig: Options = {
  migrations: {
    path: path.join(__dirname, './migrations'), // path to the folder with migrations  
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [TimeEntry],
  dbName: 'timetracker',
  type: 'postgresql',
  password: 'root',
  debug: !__prod__
};
