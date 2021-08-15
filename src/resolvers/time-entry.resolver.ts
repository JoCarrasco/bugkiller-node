
import { DefaultContext } from '../types';
import { Query, Resolver, Mutation, Ctx, Arg } from 'type-graphql';
import { TimeEntry } from '../entities';

@Resolver()
export class TimeEntryResolver {
  @Query(() => [TimeEntry])
  entries(
    @Ctx() { em }: DefaultContext): Promise<TimeEntry[]> {
    return em.find(TimeEntry, {});
  }

  @Query(() => TimeEntry, { nullable: true })
  entry(
    @Arg('id') id: number,
    @Ctx() { em }: DefaultContext
  ): Promise<TimeEntry | null> {
    return em.findOne(TimeEntry, { id });
  }

  @Mutation(() => TimeEntry)
  async createEntry(
    @Arg('title') title: string,
    @Ctx() { em }: DefaultContext
  ): Promise<TimeEntry> {
    const entry = em.create(TimeEntry, { title });
    await em.persistAndFlush(entry);
    return entry;
  }

  @Mutation(() => TimeEntry)
  async updateEntry(
    @Arg('id') id: number,
    @Arg('title', () =>  String, { nullable: true }) title: string,
    @Arg('description') description: string,
    @Ctx() { em }: DefaultContext
  ): Promise<TimeEntry | null> {
    const entry = await em.findOne(TimeEntry, { id });

    if (!entry) {
      return null;
    }

    if (typeof title !== 'undefined') {
      entry.title = title;
    }

    if (typeof description !== 'undefined') {
      entry.description = description;
    }

    await em.persistAndFlush(entry);
    return entry;
  }

  @Mutation(() => Boolean)
  async deleteEntry(  
    @Arg('id') id: number,
    @Ctx() { em }: DefaultContext
  ): Promise<boolean> {
    try {
      await em.nativeDelete(TimeEntry, { id });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
} 