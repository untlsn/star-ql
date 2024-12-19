import { createRestError } from './restError.ts';
import { db } from '../db';
import * as s from 'drizzle-orm';
import { responseCache } from '../db/schema.ts';
import { createPreparedQuery, type PreparePlaceholder } from './db.ts';

const responseCacheQuery = createPreparedQuery((placeholder: PreparePlaceholder<{ url: string }>) => {
	return db.select({ body: responseCache.body })
		.from(responseCache)
		.where(s.eq(responseCache.url, placeholder('url')))
		.limit(1)
		.prepare('response_cache_query');
});

const responseCacheMutation = createPreparedQuery((placeholder: PreparePlaceholder<{
	url:  string,
	body: string,
}>) => {
	return db.insert(responseCache)
		.values({
			url:  placeholder('url'),
			body: placeholder('body'),
		})
		.prepare('response_cache_mutation');
});

/**
 * Allow you to fetch from swapi with addition of 24h caching
 * @example
 * // Fetch from swapi
 * const peopleResponse = cachedSwapiFetch('/people');
 * // Get from cache
 * const peopleResponse = cachedSwapiFetch('/people');
 */
export async function cachedSwapiFetch<T extends object>(path: string): Promise<T> {
	const url = `${process.env.SWAPI_URL}${path}`;
	if (process.env.NODE_ENV == 'test') {
		const res = await fetch(url);
		if (res.status >= 300) throw await createRestError(res);
		const json = await res.json();
		return json.results || json.result;
	}
	const [response] = await responseCacheQuery({ url });
	if (response) {
		return JSON.parse(response.body);
	}

	const res = await fetch(url);
	if (res.status >= 300) throw await createRestError(res);
	const json = await res.json();
	const body = json.results || json.result;
	await responseCacheMutation({ url, body: JSON.stringify(body) });
	return body;
}