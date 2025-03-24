import { relations } from 'drizzle-orm';
import * as t from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schema-helpers';
import { CategoryTable } from './categories';
import { ImagesTable } from './images';

export const ProductTable = t.pgTable(
  'products',
  {
    id,
    name: t.text('name').notNull().unique(),
    price: t.integer('price').notNull(),
    available: t.boolean('available').notNull().default(true),
    number: t.integer('number').notNull(),
    categoryId: t
      .uuid()
      .notNull()
      .references(() => CategoryTable.id, { onDelete: 'cascade' }),
    createdAt,
    updatedAt,
  },
  table => [t.unique().on(table.name, table.categoryId)]
);

export const ProductsRelations = relations(ProductTable, ({ one, many }) => ({
  category: one(CategoryTable, { references: [CategoryTable.id], fields: [ProductTable.categoryId] }),
  images: many(ImagesTable),
}));
