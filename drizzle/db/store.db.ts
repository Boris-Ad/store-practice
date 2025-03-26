import { db } from '@/drizzle';
import { eq } from 'drizzle-orm';
import { revalidateTag, unstable_cacheTag, unstable_cacheLife } from 'next/cache';
import { StoreTable } from '../schema';


export const insertStore = async (data: typeof StoreTable.$inferInsert) => {
  const [store] = await db.insert(StoreTable).values(data).returning().onConflictDoUpdate({ target: StoreTable.id, set: data });
  if (store == null) throw new Error('Не удалось создать!');
  revalidateTag('store');
  return store;
};

export const getStore = async () => {
  'use cache';
  unstable_cacheLife('days')
  unstable_cacheTag('store');
  return await db.query.StoreTable.findFirst({ where: eq(StoreTable.id, 1) });
};
