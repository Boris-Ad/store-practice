'use server';

import { put, del } from '@vercel/blob';
import { deleteProduct, getProductByName, getProductById, insertProduct, updateProduct } from '@/drizzle/db/products.db';
import { createProductSchema, updateProductSchema } from '../_schema/dashboard.zod.schemas';
import { deleteImage, getProductImages, insertImage } from '@/drizzle/db/images.db';

interface IProductResponse {
  errors?: {
    number?: string[];
    name?: string[];
    price?: string[];
    categoryId?: string[];
    images?: string[];
  };
  inputFields?: {
    name?: string;
    price?: string;
    number?: string;
  };
  success?: boolean;
  message?: string;
}

export const createProductAction = async (img: { imageFile?: File }[], _prevState: unknown, formData: FormData): Promise<IProductResponse> => {
  const nameField = formData.get('name');
  const priceField = formData.get('price');
  const numberField = formData.get('number');
  const categoryIdField = formData.get('categoryId');
  const validatedFields = createProductSchema.safeParse({ name: nameField, price: priceField, number: numberField, categoryId: categoryIdField, images: img });

  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.formErrors.fieldErrors,
      inputFields: {
        name: nameField?.toString(),
        price: priceField?.toString(),
        number: numberField?.toString(),
      },
      success: false,
    };
  }

  const { name, price, number, categoryId, images } = validatedFields.data;

  const existProduct = await getProductByName(name);
  if (existProduct) {
    return { errors: { name: ['Это название уже используется!'] } };
  }

  try {
    const product = await insertProduct({ name, price, number, categoryId });
    for (const { imageFile } of images) {
      const blobImage = await put(crypto.randomUUID() + imageFile.name, imageFile, { access: 'public' });
      await insertImage({ url: blobImage.url, productId: product.id, categoryId });
    }
  } catch (error) {
    return { message: error instanceof Error ? error.message : 'Произошла ошибка!' };
  }
  return { success: true };
};

export const editProductAction = async (
  img: { imageUrl: string; imageFile?: File }[],
  productId: string,
  _prevState: unknown,
  formData: FormData
): Promise<IProductResponse> => {
  const nameField = formData.get('name');
  const priceField = formData.get('price');
  const numberField = formData.get('number');
  const categoryIdField = formData.get('categoryId');
  const validatedFields = updateProductSchema.safeParse({ name: nameField, price: priceField, number: numberField, categoryId: categoryIdField, images: img });
  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.formErrors.fieldErrors,
      inputFields: {
        name: nameField?.toString(),
        price: priceField?.toString(),
        number: numberField?.toString(),
      },
      success: false,
    };
  }
  const { name, price, number, categoryId, images } = validatedFields.data;
  try {
    await updateProduct(productId, { name, price, number, categoryId });
    const productImages = await getProductImages(productId);

    const newImagesUrl: string[] = [];

    for (const img of images) {
      if (img.imageFile) {
        const blobImage = await put(crypto.randomUUID() + img.imageFile.name, img.imageFile, { access: 'public' });
        newImagesUrl.push(blobImage.url);
      } else {
        newImagesUrl.push(img.imageUrl);
      }
    }

    for (const img of productImages) {
      const res = newImagesUrl.includes(img.url);
      if (!res) {
        await del(img.url);
      }
    }

    for (const img of productImages) {
      await deleteImage(img.id);
    }

    for (const url of newImagesUrl) {
      await insertImage({ url, productId, categoryId });
    }

    
  } catch (error) {
    return { message: error instanceof Error ? error.message : 'Произошла ошибка!' };
  }

  return { success: true };
};

export const deleteProductAction = async (productId: string) => {
  try {
    const product = await getProductById(productId,{images:true});
    if (product == null) throw new Error('Ошибка при удалении!');
    for (const image of product.images) {
      await del(image.url);
    }
    const removedProduct = await deleteProduct(productId);
    return removedProduct;
  } catch (error) {
    return error instanceof Error ? error.message : 'Произошла ошибка!';
  }
};

export const toggleAvailableAction = async (productId: string, available: boolean) => {
  try {
    await updateProduct(productId, { available });
  } catch (error) {
    return error instanceof Error ? error.message : 'Произошла ошибка!';
  }
};
