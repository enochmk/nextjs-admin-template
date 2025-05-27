import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	database: 'members-db', // Explicitly set database name
});

export const db = drizzle(pool, { schema });
