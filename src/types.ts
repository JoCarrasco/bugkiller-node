import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";

export type DefaultContext = {
  em: EntityManager<IDatabaseDriver<Connection>>
};
