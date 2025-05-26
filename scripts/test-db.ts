import { db } from '../lib/db';

async function testConnection() {
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
