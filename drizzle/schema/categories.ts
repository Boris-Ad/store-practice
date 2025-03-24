import { relations } from 'drizzle-orm';
import * as t from 'drizzle-orm/pg-core';
import { id, createdAt, updatedAt } from '../schema-helpers';
import { ProductTable } from './products';
import { ImagesTable } from './images';

export const CategoryTable = t.pgTable('categories', {
  id,
  name: t.text('name').notNull().unique(),
  imageUrl: t.text('image_url').notNull(),
  createdAt,
  updatedAt,
});

export const CategoriesRelations = relations(CategoryTable, ({ many }) => ({
  products: many(ProductTable),
  images: many(ImagesTable),
}));
