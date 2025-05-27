import { z } from 'zod';

export const editMemberSchema = z.object({
	firstName: z.string().min(2, {
		message: 'First name must be at least 2 characters.',
	}),
	lastName: z.string().min(2, {
		message: 'Last name must be at least 2 characters.',
	}),
	dateOfBirth: z.string().min(1, {
		message: 'Date of birth is required.',
	}),
	phoneNumber: z.string().min(10, {
		message: 'Phone number must be at least 10 characters.',
	}),
});

export type EditMemberSchema = z.infer<typeof editMemberSchema>;
