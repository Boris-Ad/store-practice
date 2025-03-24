import { relations } from 'drizzle-orm';
import * as t from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schema-helpers';
import { OrderTable } from './orders';

export const userRoles = ['user', 'admin'] as const;
export type UserRoles = (typeof userRoles)[number];
export const roleEnum = t.pgEnum('user_role', userRoles);

export const UserTable = t.pgTable('users', {
  id,
  name: t.text('name').notNull(),
  email: t.text('email').notNull().unique(),
  password: t.text('password'),
  image: t.text('image'),
  emailVerified: t.timestamp('emailVerified', { mode: 'date' }),
  role: roleEnum().notNull().default('user'),
  createdAt,
  updatedAt,
});

export const UserRelations = relations(UserTable, ({ many }) => ({
  orders: many(OrderTable),
}));
