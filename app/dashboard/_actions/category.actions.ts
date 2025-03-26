'use server';

import { put, del } from '@vercel/blob';
import { deleteCategory, getCategoryByName, getCategoryById, insertCategory, updateCategory } from '@/drizzle/db/categories.db';
import { createCategorySchema, updateCategorySchema } from '../_schema/dashboard.zod.schemas';
import { CategoryTable } from '@/drizzle/schema';

interface CategoryResponse {
  errors?: {
    name?: string[];
    image?: string[];
  };
  inputs?: { name?: string };
  message?: string;
  success?: boolean;
  category?: typeof CategoryTable.$inferSelect;
}

export const createCategoryAction = async (_prevState: unknown, formData: FormData): Promise<CategoryResponse> => {
  const nameField = formData.get('name');
  const imageField = formData.get('image');

  const validatedFields = createCategorySchema.safeParse({ name: nameField, image: imageField });
  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.formErrors.fieldErrors,
      inputs: { name: nameField?.toString() },
      success: false,
    };
  }

  const { name, image } = validatedFields.data;

  try {
    const existCategory = await getCategoryByName(name);

    if (existCategory) {
      return { errors: { name: ['Это название уже используется!'] } };
    }

    const blobImage = await put(crypto.randomUUID() + image.name, image, { access: 'public' });
    const category = await insertCategory({ name, imageUrl: blobImage.url });

    return { category };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Неизвестная ошибка!',
    };
  }
};

export const deleteCategoryAction = async (categoryId: string) => {
  try {
    const category = await getCategoryById(categoryId, { images: true });
    if (category == null) throw new Error('Этой категории нет!');
    const { imageUrl, images } = category;

    for (const image of images) {
      await del(image.url);
    }

    await del(imageUrl);
    await deleteCategory(categoryId);
  } catch (error) {
    return error instanceof Error ? error.message : 'Неизвестная ошибка!';
  }
};

export const updateCategoryAction = async (categoryId: string, _prevState: unknown, formData: FormData): Promise<CategoryResponse> => {
  const nameField = formData.get('name');
  const imageField = formData.get('image');

  const validatedFields = updateCategorySchema.safeParse({ name: nameField, image: imageField });
  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.formErrors.fieldErrors,
      inputs: { name: nameField?.toString() },
      success: false,
    };
  }
  const { name, image } = validatedFields.data;
  let newImage;

  try {
    const existCategory = await getCategoryById(categoryId, {});

    if (existCategory == null) {
      return { message: 'Произошла ошибка!' };
    }
    const imageValue = image && image.size > 0;
    if (name === existCategory.name && !imageValue) {
      return { category: existCategory };
    }
    if (imageValue) {
      await del(existCategory.imageUrl);
      newImage = await put(crypto.randomUUID() + image.name, image, { access: 'public' });
    }
    const category = await updateCategory(categoryId, { name, imageUrl: newImage?.url });

    return { category };
  } catch (error) {
    return { message: error instanceof Error ? error.message : 'Неизвестная ошибка!' };
  }
};
