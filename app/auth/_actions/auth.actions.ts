'use server';

import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';
import { signIn } from '@/service/auth';
import { registerSchema } from '../_schema/auth-zod.schemas';
import { getUserByEmail, insertUser } from '@/drizzle/db/users.db';

export const loginAction = async (_prev: unknown, formData: FormData) => {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  try {
    await signIn('credentials', formData);
  } catch (err) {
    if (err instanceof AuthError) {
      return {
        message: 'Неверные данные!',
        inputs: { email, password },
      };
    }
    throw err;
  }
};

interface ISignupAction {
  success?: boolean;
  message?: string;
  errors?: {
    email?: string[] | undefined;
    password?: string[] | undefined;
    name?: string[] | undefined;
  };
  inputs?: { name?: string; email?: string; password?: string };
}

export const registerAction = async (_prev: unknown, formData: FormData): Promise<ISignupAction> => {
  const formFields = { name: formData.get('name')?.toString(), email: formData.get('email')?.toString(), password: formData.get('password')?.toString() };
  const validatedFields = registerSchema.safeParse(formFields);

  if (validatedFields.success === false) {
    return {
      success: false,
      errors: validatedFields.error.formErrors.fieldErrors,
      inputs: formFields,
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    const user = await getUserByEmail(email);

    if (user) {
      return {
        errors: {
          email: ['Этот email уже используется!'],
        },
      };
    }
    const pwHash = await bcrypt.hash(password, 10);
    await insertUser({ name, email, password: pwHash });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown Error',
    };
  }
};
