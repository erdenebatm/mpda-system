import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core';
export const dancers = pgTable('dancers', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  imageUrl: text('image_url'),
  skillScore: integer('skill_score').notNull().default(0),
  privateScore: integer('private_score').notNull().default(0),
  attitudeScore: integer('attitude_score').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
export type Dancer = typeof dancers.$inferSelect;
export type NewDancer = typeof dancers.$inferInsert;
