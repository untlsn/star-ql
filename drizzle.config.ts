import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	dialect:       'postgresql',
	schema:        './src/db/schema.ts',
	out:           './drizzle',
	casing:        'snake_case',
	dbCredentials: {
		user:     process.env.POSTGRES_USER!,
		password: process.env.POSTGRES_PASSWORD!,
		database: process.env.POSTGRES_DB!,
		host:     process.env.POSTGRES_HOST!,
	},
});