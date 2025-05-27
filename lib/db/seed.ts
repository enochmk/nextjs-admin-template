import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

import { db } from './index';
import { members } from './schema';
import { membersData } from './seed-data';

async function seed() {
	console.log('Seeding database...');

	// Insert sample members
	await db.insert(members).values(membersData);

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
