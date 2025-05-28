'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq, ilike, count, desc, asc } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export interface UserFilters {
	search?: string;
	page?: number;
	limit?: number;
	sortBy?: 'name' | 'email';
	sortOrder?: 'asc' | 'desc';
}

export async function getUsers(filters: UserFilters = {}) {
	const {
		search = '',
		page = 1,
		limit = 10,
		sortBy = 'name',
		sortOrder = 'asc',
	} = filters;

	const offset = (page - 1) * limit;

	try {
		// Build where clause
		const whereClause = search ? ilike(users.name, `%${search}%`) : undefined;

		// Build order clause
		let orderClause;
		switch (sortBy) {
			case 'name':
				orderClause = sortOrder === 'desc' ? desc(users.name) : asc(users.name);
				break;
			case 'email':
				orderClause =
					sortOrder === 'desc' ? desc(users.email) : asc(users.email);
				break;
			default:
				orderClause = asc(users.name);
		}

		// Get users with pagination
		const usersList = await db
			.select({
				id: users.id,
				name: users.name,
				email: users.email,
				emailVerified: users.emailVerified,
				image: users.image,
			})
			.from(users)
			.where(whereClause)
			.orderBy(orderClause)
			.limit(limit)
			.offset(offset);

		// Get total count
		const [{ total }] = await db
			.select({ total: count() })
			.from(users)
			.where(whereClause);

		return {
			users: usersList,
			totalPages: Math.ceil(total / limit),
			currentPage: page,
			totalUsers: total,
		};
	} catch (error) {
		console.error('Error fetching users:', error);
		throw new Error('Failed to fetch users');
	}
}

export async function getUserById(id: string) {
	try {
		const [user] = await db
			.select({
				id: users.id,
				name: users.name,
				email: users.email,
				emailVerified: users.emailVerified,
				image: users.image,
			})
			.from(users)
			.where(eq(users.id, id));

		return user || null;
	} catch (error) {
		console.error('Error fetching user:', error);
		throw new Error('Failed to fetch user');
	}
}

export async function createUser(formData: {
	name: string;
	email: string;
	password: string;
}) {
	try {
		const hashedPassword = await bcrypt.hash(formData.password, 12);

		await db.insert(users).values({
			id: crypto.randomUUID(),
			name: formData.name,
			email: formData.email,
			password: hashedPassword,
		});

		revalidatePath('/users');
		return { success: true };
	} catch (error) {
		console.error('Error creating user:', error);
		throw new Error('Failed to create user');
	}
}

export async function updateUser(
	id: string,
	formData: {
		name: string;
		email: string;
		password?: string;
	}
) {
	try {
		const updateData: any = {
			name: formData.name,
			email: formData.email,
		};

		if (formData.password) {
			updateData.password = await bcrypt.hash(formData.password, 12);
		}

		await db.update(users).set(updateData).where(eq(users.id, id));

		revalidatePath('/users');
		return { success: true };
	} catch (error) {
		console.error('Error updating user:', error);
		throw new Error('Failed to update user');
	}
}

export async function deleteUser(id: string) {
	try {
		await db.delete(users).where(eq(users.id, id));
		revalidatePath('/users');
		return { success: true };
	} catch (error) {
		console.error('Error deleting user:', error);
		throw new Error('Failed to delete user');
	}
}
