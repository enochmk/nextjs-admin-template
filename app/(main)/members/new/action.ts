'use server';

import { db } from '@/lib/db';
import { members } from '@/lib/db/schema';

export const newMemberAction = async (prevState: any, formData: FormData) => {
	try {
		const firstName = formData.get('firstName')?.toString() || '';
		const lastName = formData.get('lastName')?.toString() || '';
		const dateOfBirth = formData.get('dateOfBirth')?.toString() || '';
		const phoneNumber = formData.get('phoneNumber')?.toString() || '';

		// Validate required fields
		if (!firstName || !lastName || !dateOfBirth || !phoneNumber) {
			return {
				success: false,
				message: 'All fields are required',
			};
		}

		// Insert into database
		await db.insert(members).values({
			firstName,
			lastName,
			dateOfBirth,
			phoneNumber,
		});

		return {
			success: true,
			message: 'Member created successfully',
		};
	} catch (error) {
		return {
			success: false,
			message: 'Failed to create member',
		};
	}
};
