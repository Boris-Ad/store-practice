import { db } from '@/drizzle';
import { eq } from 'drizzle-orm';
import { unstable_cacheTag, revalidateTag } from 'next/cache';
import { CategoryTable } from '../schema';

export const insertCategory = async (data: typeof CategoryTable.$inferInsert) => {
  const [category] = await db.insert(CategoryTable).values(data).returning();
  if (category == null) throw new Error('Не удалось создать!');
  revalidateTag('categories');
  return category;
};

export const deleteCategory = async (categoryId: string) => {
  const [category] = await db.delete(CategoryTable).where(eq(CategoryTable.id, categoryId)).returning();
  if (category == null) throw new Error('Не удалось удалить!');
  revalidateTag('categories');
  return category;
};

export const getCategories = async () => {
  'use cache';
  const categories = await db.query.CategoryTable.findMany();

  for (let category of categories) {
    unstable_cacheTag('category-' + category.id, 'categories');
  }
  return categories;
};

export const updateCategory = async (categoryId: string, data: Partial<typeof CategoryTable.$inferInsert>) => {
  const [category] = await db.update(CategoryTable).set(data).where(eq(CategoryTable.id, categoryId)).returning();
  if (category == null) throw new Error('Не удалось обновить!');
  revalidateTag('category-' + category.id);
  return category;
};

export const getCategoryByName = async (name: string) => {
  return await db.query.CategoryTable.findFirst({ where: eq(CategoryTable.name, name) });
};

export const getCategoryById = async (categoryId: string, { images, products }: { images?: boolean; products?: boolean }) => {
  return await db.query.CategoryTable.findFirst({
    where: eq(CategoryTable.id, categoryId),
    with: { images: images ? true : undefined, products: products ? true : undefined },
  });
};
