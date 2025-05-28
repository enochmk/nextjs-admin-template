import { z } from 'zod';

export const createUserSchema = z.object({
	name: z.string().min(2, {
		message: 'Name must be at least 2 characters.',
	}),
	email: z.string().email({
		message: 'Please enter a valid email address.',
	}),
	password: z.string().min(6, {
		message: 'Password must be at least 6 characters.',
	}),
});

export const editUserSchema = z.object({
	name: z.string().min(2, {
		message: 'Name must be at least 2 characters.',
	}),
	email: z.string().email({
		message: 'Please enter a valid email address.',
	}),
	password: z
		.string()
		.optional()
		.refine(
			val => {
				if (val && val.length > 0) {
					return val.length >= 6;
				}
				return true;
			},
			{
				message: 'Password must be at least 6 characters if provided.',
			}
		),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type EditUserSchema = z.infer<typeof editUserSchema>;
