import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { responseCache } from './schema.ts';

export const db = drizzle(
	postgres(process.env.DATABASE_URL!),
	{ schema: { responseCache } },
);