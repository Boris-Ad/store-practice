'use server';

import { put, del } from '@vercel/blob';
import { createStoreSchema, updateStoreDataSchema } from '../_schema/dashboard.zod.schemas';
import { getStore, insertStore } from '@/drizzle/db/store.db';
import { notFound } from 'next/navigation';

interface StoreProps {
  errors?: {
    name?: string[];
    logo?: string[];
    banner?: string[];
  };
  inputs?: { name?: string };
  success?: boolean;
  message?: string;
}

export const createStoreAction = async (_prevState: unknown, formData: FormData): Promise<StoreProps> => {
  const fieldName = formData.get('name');
  const validatedFields = createStoreSchema.safeParse(Object.fromEntries(formData));

  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.formErrors.fieldErrors,
      inputs: { name: fieldName?.toString() },
      success: false,
    };
  }

  const { name, logo, banner } = validatedFields.data;

  try {
    const blobLogo = await put(crypto.randomUUID() + logo.name, logo, { access: 'public' });
    const blobBanner = await put(crypto.randomUUID() + banner.name, banner, { access: 'public' });

    await insertStore({ name, logoUrl: blobLogo.url, bannerUrl: blobBanner.url });
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Произошла ошибка!',
    };
  }
  return { success: true };
};

export const updateStoreAction = async (_prevState: unknown, formData: FormData): Promise<StoreProps> => {
  const store = await getStore();
  if (store == null) notFound();

  const fieldName = formData.get('name');
  const validatedFields = updateStoreDataSchema.safeParse(Object.fromEntries(formData));

  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.formErrors.fieldErrors,
      inputs: { name: fieldName?.toString() },
      success: false,
    };
  }

  const { name, logo, banner } = validatedFields.data;

  let logoUrl = store.logoUrl;
  let bannerUrl = store.bannerUrl;

  try {
    if (logo && logo.size > 0) {
      await del(store.logoUrl);
      const res = await put(crypto.randomUUID() + logo.name, logo, { access: 'public' });
      logoUrl = res.url;
    }

    if (banner && banner.size > 0) {
      await del(store.bannerUrl);
      const res = await put(crypto.randomUUID() + banner.name, banner, { access: 'public' });
      bannerUrl = res.url;
    }
    await insertStore({ name, logoUrl, bannerUrl });
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Произошла ошибка!',
    };
  }

  return { success: true };
};
