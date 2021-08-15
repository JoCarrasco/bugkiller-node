import { MikroORM } from "@mikro-orm/core";
import { MikroORMConfig } from "./config";
import { __prod__ } from "./constants";
import { TimeEntry } from "./entities/TimeEntry";
import express, { Express } from "express";
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from "type-graphql";
import { TestResolver } from "./resolver/TestResolver";

const main = async () => {
  const orm = await MikroORM.init(MikroORMConfig);
  await orm.getMigrator().up();
  const entry = orm.em.create(TimeEntry, { title: 'This is a new task', description: 'A task for me' });
  orm.em.persistAndFlush(entry);
  const app = express();

  await apolloSetup(app);

  app.listen(4000, () => {
    console.log('LISTENING TO PORT 4000');
  });

 
};

async function apolloSetup(app: Express) {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TestResolver],
      validate: false
    })
  })

  await apolloServer.start();
  apolloServer.applyMiddleware({ app })
}

main().catch((err) => {
  console.error(err);
});