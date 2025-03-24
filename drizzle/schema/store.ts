import * as t from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schema-helpers';

export const StoreTable = t.pgTable('store', {
  id: t.integer('id').unique().notNull().default(1),
  name: t.text('name').notNull(),
  logoUrl: t.text('logo_url').notNull(),
  bannerUrl: t.text('banner_url').notNull(),
  createdAt,
  updatedAt,
});
