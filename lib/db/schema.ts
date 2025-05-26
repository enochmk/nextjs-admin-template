import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const members = pgTable('members', {
	id: serial('id').primaryKey(),
	firstName: varchar('first_name', { length: 255 }).notNull(),
	lastName: varchar('last_name', { length: 255 }).notNull(),
	dateOfBirth: text('date_of_birth').notNull(),
	phoneNumber: varchar('phone_number', { length: 20 }).notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Member = typeof members.$inferSelect;
export type NewMember = typeof members.$inferInsert;
