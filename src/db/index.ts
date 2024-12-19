import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { responseCache } from './schema.ts';

export const db = drizzle(
	postgres({
		user:     process.env.POSTGRES_USER!,
		password: process.env.POSTGRES_PASSWORD!,
		database: process.env.POSTGRES_DB!,
		host:     process.env.POSTGRES_HOST!,
	}),
	{ schema: { responseCache } },
);