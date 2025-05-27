'use server';

import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { members } from '@/lib/db/schema';
import { editMemberSchema } from './schema';
import { revalidatePath } from 'next/cache';

export interface ActionState {
	success?: boolean;
	message?: string;
	errors?: Record<string, string[]>;
}

export async function editMemberAction(
	memberId: number,
	prevState: ActionState | null,
	formData: FormData,
): Promise<ActionState> {
	try {
		// Parse form data
		const rawData = {
			firstName: formData.get('firstName'),
			lastName: formData.get('lastName'),
			dateOfBirth: formData.get('dateOfBirth'),
			phoneNumber: formData.get('phoneNumber'),
		};

		// Validate data
		const validatedData = editMemberSchema.safeParse(rawData);

		if (!validatedData.success) {
			return {
				success: false,
				message: 'Invalid form data',
				errors: validatedData.error.flatten().fieldErrors,
			};
		}

		// Check if member exists
		const existingMember = await db
			.select()
			.from(members)
			.where(eq(members.id, memberId))
			.limit(1);

		if (existingMember.length === 0) {
			return {
				success: false,
				message: 'Member not found',
			};
		}

		// Update member
		await db
			.update(members)
			.set({
				...validatedData.data,
				updatedAt: new Date(),
			})
			.where(eq(members.id, memberId));

		// Revalidate relevant paths
		revalidatePath('/members');
		revalidatePath(`/members/${memberId}`);
		revalidatePath(`/members/${memberId}/edit`);

		return {
			success: true,
			message: 'Member updated successfully!',
		};
	} catch (error) {
		console.error('Error updating member:', error);
		return {
			success: false,
			message: 'Failed to update member. Please try again.',
		};
	}
}
