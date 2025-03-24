import { relations } from 'drizzle-orm';
import * as t from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schema-helpers';
import { CategoryTable } from './categories';
import { ProductTable } from './products';

export const ImagesTable = t.pgTable('images', {
  id,
  url: t.text('url').notNull().unique(),
  categoryId: t
    .uuid()
    .notNull()
    .references(() => CategoryTable.id),
  productId: t
    .uuid()
    .notNull()
    .references(() => ProductTable.id, { onDelete: 'cascade' }),
  createdAt,
  updatedAt,
});

export const ImagesRelations = relations(ImagesTable, ({ one }) => ({
  category: one(CategoryTable, { references: [CategoryTable.id], fields: [ImagesTable.categoryId] }),
  product: one(ProductTable, { references: [ProductTable.id], fields: [ImagesTable.productId] }),
}));
