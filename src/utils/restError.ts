import { GraphQLError } from 'graphql/error';

export class RestError extends Error {
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

export async function createRestError(res: Response) {
	return new RestError(res.status, await res.json());
}