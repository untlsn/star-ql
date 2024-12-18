import { responseCache } from '../../db/schema.ts';
import cron from 'node-cron'
import { createPreparedQuery, type PreparePlaceholder } from './db.ts';
import { db } from '../../db';
import * as s from 'drizzle-orm';
import * as date from 'date-fns';

const responseCacheDelete = createPreparedQuery((placeholder: PreparePlaceholder<{ date: string }>) => {
	return db.delete(responseCache)
		.where(s.lte(responseCache.created, placeholder('date')))
		.prepare('response_cache_query')
})

export function removeOldResponseCache() {
	console.log('Corn scheduled started');
	cron.schedule('0 0 * * *', async () => {
		try {
			await responseCacheDelete({ date: date.formatISO(
				date.subDays(new Date(), 1)
			) })
			console.log("Cache cleared successfully.");
		} catch (error) {
			console.error("Cache cleared unsuccessfully:", error);
		}
	}, { runOnInit: true });
}

