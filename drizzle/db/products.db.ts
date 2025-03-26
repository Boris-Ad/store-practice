import { db } from '@/drizzle';
import { and, asc, desc, eq, ilike, SQL } from 'drizzle-orm';
import { revalidateTag, unstable_cacheTag } from 'next/cache';
import { ProductTable } from '../schema';

export const insertProduct = async (data: typeof ProductTable.$inferInsert) => {
  const [product] = await db.insert(ProductTable).values(data).returning();
  if (product == null) throw new Error('Не удалось создать!');
  revalidateTag('products');
  return product;
};

export const updateProduct = async (productId: string, data: Partial<typeof ProductTable.$inferInsert>) => {
  const [product] = await db.update(ProductTable).set(data).where(eq(ProductTable.id, productId)).returning();
  if (product == null) throw new Error('Не удалось обновить!');
  revalidateTag('product-' + productId);
  return product;
};

export const deleteProduct = async (productId: string) => {
  const [product] = await db.delete(ProductTable).where(eq(ProductTable.id, productId)).returning();
  if (product == null) throw new Error('Не удалось удалить!');
  revalidateTag('product-' + product.id);
  return product;
};

export const getProducts = async (searchParams: Record<string, string | undefined>) => {
  'use cache';

  const filterByOrder: SQL[] = [];
  const price = searchParams.price;
  const number = searchParams.number;

  const filterByWhere: SQL[] = [];
  const category = searchParams.category;
  const available = searchParams.available;
  const name = searchParams.name;

  if (price) {
    filterByOrder.push(price === 'asc' ? asc(ProductTable.price) : desc(ProductTable.price));
  }
  if (number) {
    filterByOrder.push(number === 'asc' ? asc(ProductTable.number) : desc(ProductTable.number));
  }
  if (category && category !== 'all') {
    filterByWhere.push(eq(ProductTable.categoryId, category));
  }
  if (available) {
    filterByWhere.push(available === 'true' ? eq(ProductTable.available, true) : eq(ProductTable.available, false));
  }
  if (name) {
    filterByWhere.push(ilike(ProductTable.name, `%${name}%`));
  }

  const products = await db
    .select()
    .from(ProductTable)
    .where(and(...filterByWhere))
    .orderBy(...filterByOrder, desc(ProductTable.createdAt));

  for (let product of products) {
    unstable_cacheTag('product-' + product.id, 'products');
  }
  return products;
};

export const getProductByName = async (name: string) => {
  const product = await db.query.ProductTable.findFirst({ where: eq(ProductTable.name, name) });
  return product;
};

export const getProductById = async (productId: string, { images, category }: { images?: boolean; category?: boolean }) => {
  return await db.query.ProductTable.findFirst({
    where: eq(ProductTable.id, productId),
    with: { images: images ? true : undefined, category: category ? true : undefined },
  });
};
