import * as pg from 'drizzle-orm/pg-core';
import * as s from 'drizzle-orm';
import { index } from 'drizzle-orm/pg-core';

export const responseCache = pg.pgTable('response_cache', {
	id:      pg.bigserial({ mode: 'bigint' }).primaryKey(),
	url:     pg.text().notNull(),
	body:    pg.text().notNull(),
	created: pg.timestamp().default(s.sql`now()`),
}, (t) => [index('response_cache_url_index').on(t.url)]);