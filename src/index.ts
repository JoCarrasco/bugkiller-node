import { MikroORM } from "@mikro-orm/core";
import express, { Express } from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer } from 'apollo-server-express';
import { MikroORMConfig } from "./config";
import { __prod__ } from "./constants";
import { TimeEntry } from "./entities/time-entry.entity";
import { TimeEntryResolver } from "./resolvers";

const main = async () => {
  const orm = await MikroORM.init(MikroORMConfig);
  await orm.getMigrator().up();
  const entry = orm.em.create(TimeEntry, { title: 'This is a new task', description: 'A task for me' });
  orm.em.persistAndFlush(entry);
  const app = express();

  await apolloSetup(app, orm);

  app.listen(4000, () => {
    console.log('LISTENING TO PORT 4000');
  });
};

async function apolloSetup(app: Express, orm: MikroORM) {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TimeEntryResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em })
  })

  await apolloServer.start();
  apolloServer.applyMiddleware({ app })
}

main().catch((err) => {
  console.error(err);
});