import { createSchema, createYoga } from 'graphql-yoga';
import * as fs from 'node:fs';
import { GraphQLError } from 'graphql/error';
import { cachedSwapiFetch } from './utils/cachedSwapiFetch.ts';
import { RestError } from './utils/restError.ts';

function getTypeDefs() {
	return fs.readFileSync('./typeDefs.graphql', 'utf8')
}



export const schema = createSchema({
	typeDefs: getTypeDefs(),
	resolvers: {
		Query: {
			async allFilms() {
				return cachedSwapiFetch('/films');
			},
			async film(_parent, { id }: { id: number }) {
				return cachedSwapiFetch(`/films/${id}`);
			},
			async allPeoples() {
				return cachedSwapiFetch('/people');
			},
			async people(_parent, { id }: { id: number }) {
				return cachedSwapiFetch(`/people/${id}`);
			},
			async allPlanets() {
				return cachedSwapiFetch('/planets');
			},
			async planet(_parent, { id }: { id: number }) {
				return cachedSwapiFetch(`/planets/${id}`);
			},
			async allSpecies() {
				return cachedSwapiFetch('/planets');
			},
			async specie(_parent, { id }: { id: number }) {
				return cachedSwapiFetch(`/species/${id}`);
			},
			async allVehicles() {
				return cachedSwapiFetch('/species');
			},
			async vehicle(_parent, { id }: { id: number }) {
				return cachedSwapiFetch(`/vehicles/${id}`);
			},
			async allStarships() {
				return cachedSwapiFetch('/starships');
			},
			async starship(_parent, { id }: { id: number }) {
				return cachedSwapiFetch(`/starships/${id}`);
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

console.log(`Server run on http://localhost:${server.port}`);