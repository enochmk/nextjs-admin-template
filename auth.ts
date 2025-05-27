import NextAuth from 'next-auth';
import { z } from 'zod';
import Credentials from 'next-auth/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';

import { db } from '@/lib/db';
import { accounts, sessions, users, verificationTokens } from '@/lib/db/schema';

const signInSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

// Import bcrypt dynamically to avoid edge runtime issues
async function verifyPassword(password: string, hashedPassword: string) {
	const bcrypt = await import('bcryptjs');
	return bcrypt.compare(password, hashedPassword);
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: DrizzleAdapter(db, {
		usersTable: users,
		accountsTable: accounts,
		sessionsTable: sessions,
		verificationTokensTable: verificationTokens,
	}),
	providers: [
		Credentials({
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			authorize: async (credentials) => {
				try {
					const { email, password } = signInSchema.parse(credentials);

					// Find user by email
					const user = await db.query.users.findFirst({
						where: (users, { eq }) => eq(users.email, email),
					});

					if (!user) {
						return null;
					}

					// Verify password
					const isValid = await verifyPassword(password, user.password!);

					if (!isValid) {
						return null;
					}

					return {
						id: user.id,
						email: user.email,
						name: user.name,
					};
				} catch (error) {
					return null;
				}
			},
		}),
	],
	pages: {
		signIn: '/sign-in',
	},
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		jwt: ({ token, user }) => {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		session: ({ session, token }) => {
			if (token.id) {
				session.user.id = token.id as string;
			}
			return session;
		},
	},
});
