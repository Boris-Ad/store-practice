import { relations } from 'drizzle-orm';
import * as t from 'drizzle-orm/pg-core';
import { createdAt, id, updatedAt } from '../schema-helpers';
import { UserTable } from './users';

export const OrderTable = t.pgTable('orders', {
  id,
  paymentId: t.text('payment_id').notNull().unique(),
  userName: t.text('user_name').notNull(),
  userPhone: t.text('user_phone').notNull(),
  userAddress: t.text('user_address').notNull(),
  comments: t.text('comments'),
  price: t.integer('price').notNull(),
  status: t.text(),
  delivered: t.boolean('delivered').notNull().default(false),
  info: t.jsonb('info').notNull(),
  userId: t
    .uuid('user_id')
    .notNull()
    .references(() => UserTable.id, { onDelete: 'restrict' }),
  createdAt,
});

export const OrderRelations = relations(OrderTable, ({ one }) => ({
  user: one(UserTable, { references: [UserTable.id], fields: [OrderTable.userId] }),
}));
