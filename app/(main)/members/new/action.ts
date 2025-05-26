import { db } from '@/lib/db';
import { members } from '@/lib/db/schema';
import { redirect } from 'next/navigation';

export const createMemberAction = async (
	prevState: any,
	formData: FormData,
) => {
	try {
		const firstName = formData.get('firstName')?.toString() || '';
		const lastName = formData.get('lastName')?.toString() || '';
		const dateOfBirth = formData.get('dateOfBirth')?.toString() || '';
		const phoneNumber = formData.get('phoneNumber')?.toString() || '';

		// Validate required fields
		if (!firstName || !lastName || !dateOfBirth || !phoneNumber) {
			return {
				success: false,
				error: 'All fields are required',
				message: null,
			};
		}

		// Insert into database
		await db.insert(members).values({
			firstName,
			lastName,
			dateOfBirth,
			phoneNumber,
		});

		// Redirect to members page on success
		redirect('/members');
	} catch (error) {
		console.error('Error creating member:', error);
		return {
			success: false,
			error: 'Failed to create member',
			message: null,
		};
	}
};
