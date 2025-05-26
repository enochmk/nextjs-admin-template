import { db } from './index';
import { members } from './schema';

async function seed() {
	console.log('Seeding database...');

	// Insert sample members
	await db.insert(members).values([
		{
			firstName: 'John',
			lastName: 'Doe',
			dateOfBirth: '1990-05-15',
			phoneNumber: '+1 (555) 123-4567',
		},
		{
			firstName: 'Jane',
			lastName: 'Smith',
			dateOfBirth: '1985-12-08',
			phoneNumber: '+1 (555) 987-6543',
		},
		{
			firstName: 'Mike',
			lastName: 'Johnson',
			dateOfBirth: '1992-03-22',
			phoneNumber: '+1 (555) 456-7890',
		},
	]);

	console.log('Database seeded successfully!');
}

seed()
	.catch((error) => {
		console.error('Error seeding database:', error);
		process.exit(1);
	})
	.finally(() => {
		process.exit(0);
	});
