import { db } from '@/drizzle';
import { eq } from 'drizzle-orm';
import { unstable_cacheTag, revalidateTag } from 'next/cache';
import { ImagesTable } from '../schema';

export const insertImage = async (data: typeof ImagesTable.$inferInsert) => {
  const [image] = await db.insert(ImagesTable).values(data).returning();
  if (image == null) throw new Error('Не удалось создать!');
  revalidateTag('images')
  return image;
};

export const deleteImage = async (imageId: string) => {
  const [image] = await db.delete(ImagesTable).where(eq(ImagesTable.id, imageId)).returning();
  if (image == null) throw new Error('Не удалось удалить!');
  revalidateTag('images')
  return image;
};

export const getProductImages = async (productId: string) => {
  'use cache'
  unstable_cacheTag('images')
  const images = await db.query.ImagesTable.findMany({ where: eq(ImagesTable.productId, productId) });
  return images;
};
