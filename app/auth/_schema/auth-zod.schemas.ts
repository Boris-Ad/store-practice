import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  name: z.string().min(1, { message: 'Обязательно для заполнения!' }).trim().max(50),
  email: z.string().trim().email({ message: 'Обязательно для заполнения!' }),
  password: z.string().trim().min(6, { message: 'Минимум 6 символов' }).max(50),
});
