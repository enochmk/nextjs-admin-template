import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

import { db } from '../lib/db';

async function testConnection() {
	console.log('DATABASE_URL:', process.env.DATABASE_URL);
	console.log('All env vars related to DB:', {
		DATABASE_URL: process.env.DATABASE_URL,
		PGDATABASE: process.env.PGDATABASE,
		PGUSER: process.env.PGUSER,
		PGHOST: process.env.PGHOST,
		PGPORT: process.env.PGPORT,
	});

	try {
		// Simple query to test connection
		const result = await db.execute('SELECT NOW()');
		console.log('✅ Database connection successful!');
		console.log('Current time from DB:', result.rows[0]);
	} catch (error) {
		console.error('❌ Database connection failed:', error);
		console.log('\nPlease ensure:');
		console.log('1. PostgreSQL is running');
		console.log('2. Database exists and credentials are correct in .env.local');
		console.log('3. Run `npm run db:push` to create tables');
	}
}

testConnection();
