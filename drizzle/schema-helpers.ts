import * as t from 'drizzle-orm/pg-core'

export const id = t.uuid('id').primaryKey().defaultRandom()
export const createdAt = t.timestamp('created_at',{ withTimezone: true }).notNull().defaultNow();
export const updatedAt = t.timestamp('updated_at',{withTimezone:true}).notNull().defaultNow().$onUpdate(() => new Date())