import { createSchema, createYoga } from 'graphql-yoga';
import * as fs from 'node:fs';
import { GraphQLError } from 'graphql/error';
import { cachedSwapiFetch } from './utils/cachedSwapiFetch.ts';
import { RestError } from './utils/restError.ts';
import { createSearchParams } from './utils/searchParams.ts';
import { removeOldResponseCache } from './utils/cron.ts';
import { countWords, getMostUsedWordFromSource } from './utils/wordsCounter.ts';

function getTypeDefs() {
	return fs.readFileSync('./typeDefs.graphql', 'utf8')
}


type FetchAllArgs<T=unknown> = { limit?: number, page?: number } & T;

export const schema = createSchema({
	typeDefs: getTypeDefs(),
	resolvers: {
		Query: {
			async allFilms(_parent, args: FetchAllArgs<{ title?: string }> = {}) {
				return cachedSwapiFetch(`/films${createSearchParams(args)}`);
			},
			async film(_parent, { id }: { id: number }) {
				return cachedSwapiFetch(`/films/${id}`);
			},
			async allPeoples(_parent, args: FetchAllArgs = {}) {
				return cachedSwapiFetch(`/people${createSearchParams(args)}`);
			},
			async allPeoplesFiltered(_parent, args: FetchAllArgs<{ name?: string }> = {}) {
				return cachedSwapiFetch(`/people${createSearchParams(args)}`);
			},
			async people(_parent, { id }: { id: number }) {
				return cachedSwapiFetch(`/people/${id}`);
			},
			async allPlanets(_parent, args: FetchAllArgs = {}) {
				return cachedSwapiFetch(`/planets${createSearchParams(args)}`);
			},
			async allPlanetsFiltered(_parent, args: FetchAllArgs<{ name?: string }> = {}) {
				return cachedSwapiFetch(`/planets${createSearchParams(args)}`);
			},
			async planet(_parent, { id }: { id: number }) {
				return cachedSwapiFetch(`/planets/${id}`);
			},
			async allSpecies(_parent, args: FetchAllArgs = {}) {
				return cachedSwapiFetch(`/planets${createSearchParams(args)}`);
			},
			async allSpeciesFiltered(_parent, args: FetchAllArgs<{ name?: string }> = {}) {
				return cachedSwapiFetch(`/planets${createSearchParams(args)}`);
			},
			async specie(_parent, { id }: { id: number }) {
				return cachedSwapiFetch(`/species/${id}`);
			},
			async allVehicles(_parent, args: FetchAllArgs = {}) {
				return cachedSwapiFetch(`/species${createSearchParams(args)}`);
			},
			async allVehiclesFiltered(_parent, args: FetchAllArgs<{ name?: string, model?: string }> = {}) {
				return cachedSwapiFetch(`/species${createSearchParams(args)}`);
			},
			async vehicle(_parent, { id }: { id: number }) {
				return cachedSwapiFetch(`/vehicles/${id}`);
			},
			async allStarships(_parent, args: FetchAllArgs = {}) {
				return cachedSwapiFetch(`/starships${createSearchParams(args)}`);
			},
			async allStarshipsFiltered(_parent, args: FetchAllArgs<{ name?: string, model?: string }> = {}) {
				return cachedSwapiFetch(`/starships${createSearchParams(args)}`);
			},
			async starship(_parent, { id }: { id: number }) {
				return cachedSwapiFetch(`/starships/${id}`);
			},
		},
		Film: {
			async crawl_words_count(parent) {
				return countWords(
					parent.properties.opening_crawl
				)
			},
			async crawl_popular_persons_count(parent) {
				const peoples = await cachedSwapiFetch<{
					uid: string,
					name: string,
					url: string,
				}[]>(`/people?page=1&limit=999`);
				return getMostUsedWordFromSource(
					parent.properties.opening_crawl,
					peoples.map(it => it.name),
				)
			},
		}
	},
})

const yoga = createYoga({ schema, maskedErrors: {
		maskError(error, message) {
			const cause = (error as { originalError?: unknown } | undefined)?.originalError;
			if (cause instanceof RestError) return cause.toGraphQLError()
			if (cause instanceof GraphQLError) return cause;
			return new GraphQLError(message, { extensions: { http: { status: 500 } } });
		},
	} })

const server = Bun.serve({
	fetch: yoga.fetch,
	port: 4000,
})

removeOldResponseCache()

console.log(`Server run on http://localhost:${server.port}`);