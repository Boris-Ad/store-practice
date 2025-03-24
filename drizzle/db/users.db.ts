import { db } from '@/drizzle';
import { UserTable } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

export const insertUser = async (data: typeof UserTable.$inferInsert) => {
  const [newUser] = await db.insert(UserTable).values(data).returning();
  if (newUser == null) throw new Error('Регистрация не удалась!');
  return newUser;
};

export const getUserByEmail = async (email: string) => {
  try {
    return await db.query.UserTable.findFirst({ where: eq(UserTable.email, email) });
  } catch (error) {}
};
