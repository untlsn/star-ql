import { createSchema, createYoga } from 'graphql-yoga';
import * as fs from 'node:fs';
import { GraphQLError } from 'graphql/error';

function getTypeDefs() {
	return fs.readFileSync('./typeDefs.graphql', 'utf8')
}

class RestError extends Error {
	constructor(private status: number, private body: object) {
		super("Swapi REST throw error");
	}
	toGraphQLError(): GraphQLError {
		return new GraphQLError("Swapi REST throw error", { extensions: {
		http: {
			status: this.status,
			body: this.body,
		} } });
	}
}

async function createRestError(res: Response) {
	return new RestError(res.status, await res.json());
}

export const schema = createSchema({
	typeDefs: getTypeDefs(),
	resolvers: {
		Query: {
			async allFilms() {
				const res = await fetch('https://swapi.tech/api/films');
				if (res.status >= 300) throw await createRestError(res);
				return (await res.json()).result;
			},
			async film(_parent, { id }: { id: number }) {
				const res = await fetch(`https://swapi.tech/api/films/${id}`);
				if (res.status >= 300) throw await createRestError(res);
				return (await res.json()).result;
			},
			async allPeoples() {
				const res = await fetch('https://swapi.tech/api/people');
				if (res.status >= 300) throw await createRestError(res);
				return (await res.json()).result;
			},
			async people(_parent, { id }: { id: number }) {
				const res = await fetch(`https://swapi.tech/api/people/${id}`);
				if (res.status >= 300) throw await createRestError(res);
				return (await res.json()).result;
			},
			async allPlanets() {
				const res = await fetch('https://swapi.tech/api/planets');
				if (res.status >= 300) throw await createRestError(res);
				return (await res.json()).result;
			},
			async planet(_parent, { id }: { id: number }) {
				const res = await fetch(`https://swapi.tech/api/planets/${id}`);
				if (res.status >= 300) throw await createRestError(res);
				return (await res.json()).result;
			},
			async allSpecies() {
				const res = await fetch('https://swapi.tech/api/planets');
				if (res.status >= 300) throw await createRestError(res);
				return (await res.json()).result;
			},
			async specie(_parent, { id }: { id: number }) {
				const res = await fetch(`https://swapi.tech/api/species/${id}`);
				if (res.status >= 300) throw await createRestError(res);
				return (await res.json()).result;
			},
			async allVehicles() {
				const res = await fetch('https://swapi.tech/api/species');
				if (res.status >= 300) throw await createRestError(res);
				return (await res.json()).result;
			},
			async vehicle(_parent, { id }: { id: number }) {
				const res = await fetch(`https://swapi.tech/api/vehicles/${id}`);
				if (res.status >= 300) throw await createRestError(res);
				return (await res.json()).result;
			},
			async allStarships() {
				const res = await fetch('https://swapi.tech/api/starships');
				if (res.status >= 300) throw await createRestError(res);
				return (await res.json()).result;
			},
			async starship(_parent, { id }: { id: number }) {
				const res = await fetch(`https://swapi.tech/api/starships/${id}`);
				if (res.status >= 300) throw await createRestError(res);
				return (await res.json()).result;
			},
		}
	},
})

const yoga = createYoga({ schema, maskedErrors: {
		maskError(error, message) {
			const cause = error.originalError;
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