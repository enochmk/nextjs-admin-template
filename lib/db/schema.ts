import {
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
	integer,
	primaryKey,
} from 'drizzle-orm/pg-core';
import type { AdapterAccount } from '@auth/core/adapters';

export const members = pgTable('members', {
	id: serial('id').primaryKey(),
	firstName: varchar('first_name', { length: 255 }).notNull(),
	lastName: varchar('last_name', { length: 255 }).notNull(),
	dateOfBirth: text('date_of_birth').notNull(),
	phoneNumber: varchar('phone_number', { length: 20 }).notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const users = pgTable('user', {
	id: text('id').notNull().primaryKey(),
	name: text('name'),
	email: text('email').notNull(),
	emailVerified: timestamp('emailVerified', { mode: 'date' }),
	image: text('image'),
	password: text('password'),
});

export const accounts = pgTable(
	'account',
	{
		userId: text('userId')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		type: text('type').$type<AdapterAccount['type']>().notNull(),
		provider: text('provider').notNull(),
		providerAccountId: text('providerAccountId').notNull(),
		refresh_token: text('refresh_token'),
		access_token: text('access_token'),
		expires_at: integer('expires_at'),
		token_type: text('token_type'),
		scope: text('scope'),
		id_token: text('id_token'),
		session_state: text('session_state'),
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId],
		}),
	}),
);

export const sessions = pgTable('session', {
	sessionToken: text('sessionToken').notNull().primaryKey(),
	userId: text('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
	'verificationToken',
	{
		identifier: text('identifier').notNull(),
		token: text('token').notNull(),
		expires: timestamp('expires', { mode: 'date' }).notNull(),
	},
	(vt) => ({
		compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
	}),
);

export type Member = typeof members.$inferSelect;
export type NewMember = typeof members.$inferInsert;
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
