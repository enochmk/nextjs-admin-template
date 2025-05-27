'use server';

import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { members } from '@/lib/db/schema';

export async function deleteMember(memberId: number) {
	try {
		// Check if member exists
		const existingMember = await db
			.select()
			.from(members)
			.where(eq(members.id, memberId))
			.limit(1);

		if (existingMember.length === 0) {
			throw new Error('Member not found');
		}

		// Delete the member
		await db.delete(members).where(eq(members.id, memberId));

		// Revalidate the members page to update the list
		revalidatePath('/members');

		return { success: true, message: 'Member deleted successfully' };
	} catch (error) {
		console.error('Error deleting member:', error);
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Failed to delete member',
		};
	}
}

export async function getMember(memberId: number) {
	try {
		const member = await db
			.select()
			.from(members)
			.where(eq(members.id, memberId))
			.limit(1);

		if (member.length === 0) {
			throw new Error('Member not found');
		}

		return { success: true, data: member[0] };
	} catch (error) {
		console.error('Error fetching member:', error);
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Failed to fetch member',
		};
	}
}

export async function deleteMemberAndRedirect(memberId: number) {
	const result = await deleteMember(memberId);

	if (result.success) {
		redirect('/members');
	}

	return result;
}
