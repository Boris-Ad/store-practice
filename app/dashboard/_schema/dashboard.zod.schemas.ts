import z from 'zod';

const imageSchema = z
  .instanceof(File, { message: 'Обязательный параметр!' })
  .refine(file => file.size < 3000000, 'Не больше 3 Mb')
  .refine(file => file.size === 0 || file.type.startsWith('image/'), 'Обязательный параметр!');

export const createStoreSchema = z.object({
  name: z.string().min(1, { message: 'Обязательно для заполнения!' }).max(60, { message: 'Не больше 60 символов!' }),
  logo: imageSchema.refine(file => file.size > 0, 'Обязательный параметр!'),
  banner: imageSchema.refine(file => file.size > 0, 'Обязательный параметр!'),
});

export const updateStoreDataSchema = createStoreSchema.extend({
  logo: imageSchema.optional(),
  banner: imageSchema.optional(),
});

export const createCategorySchema = z.object({
  name: z.string().min(1, { message: 'Обязательно для заполнения!' }).max(20, { message: 'Не больше 20 символов!' }),
  image: imageSchema.refine(file => file.size > 0, 'Обязательный параметр!'),
});

export const updateCategorySchema = createCategorySchema.extend({
  image: imageSchema.optional(),
});

export const createProductSchema = z.object({
  name: z.string().min(1, { message: 'Обязательно для заполнения!' }).max(40, { message: 'Не больше 40 символов!' }),
  price: z.coerce.number({ message: 'Должно быть числом!' }).int().min(1, { message: 'Должно быть положительным числом!' }),
  number: z.coerce.number({ message: 'Должно быть числом!' }).int().min(1, { message: 'Должно быть положительным числом!' }),
  categoryId: z.string().min(1),
  images: z
    .object({
      imageFile: imageSchema.refine(file => file.size > 0, 'Обязательный параметр!'),
    })
    .array()
    .nonempty({ message: 'Обязательный параметр!' }),
});

export const updateProductSchema = createProductSchema.extend({
  images: z
    .object({
      imageUrl: z.string(),
      imageFile: imageSchema.optional(),
    })
    .array()
    .nonempty({ message: 'Обязательный параметр!' }),
});
