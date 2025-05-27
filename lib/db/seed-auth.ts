import bcrypt from 'bcryptjs';
import { db } from './index';
import { users } from './schema';

async function seedAuthUser() {
	try {
		console.log('🌱 Starting auth user seeding...');

		// Hash the password
		const hashedPassword = await bcrypt.hash('password123', 12);
		console.log('🔒 Password hashed successfully');

		// Insert test user
		const result = await db
			.insert(users)
			.values([
				{
					id: 'test-user-1',
					name: 'Test User',
					email: 'test@example.com',
					password: hashedPassword,
				},
			])
			.onConflictDoNothing()
			.returning();

		console.log('✅ Auth user seeded successfully:', result);
	} catch (error) {
		console.error('❌ Error seeding auth user:', error);
		throw error;
	}
}

// Run if this file is executed directly
if (require.main === module) {
	seedAuthUser()
		.then(() => {
			console.log('✅ Seeding completed');
			process.exit(0);
		})
		.catch(error => {
			console.error('❌ Seeding failed:', error);
			process.exit(1);
		});
}

export { seedAuthUser };
