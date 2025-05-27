'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { signInFormSchema } from './schema';

export const signInAction = async (prevState: any, formData: FormData) => {
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;

	// Validate the form data
	const validatedFields = signInFormSchema.safeParse({
		email,
		password,
	});

	if (!validatedFields.success) {
		return {
			success: false,
			message: 'Invalid form data',
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	try {
		await signIn('credentials', {
			email,
			password,
			redirectTo: '/dashboard',
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return {
						success: false,
						message: 'Invalid email or password',
					};
				default:
					return {
						success: false,
						message: 'Something went wrong. Please try again.',
					};
			}
		}
		throw error;
	}
};
