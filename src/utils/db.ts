import * as s from 'drizzle-orm';
import type { PgPreparedQuery } from 'drizzle-orm/pg-core/session';

export type PreparePlaceholder<T> = <K extends keyof T & string>(name: K) => s.Placeholder<K, T[K]>;
export type PrepareExecuteQuery<TInput extends Record<string, unknown>, TOutput extends PgPreparedQuery<any>> =
	(values: TInput) => ReturnType<TOutput['execute']>;

export function createPreparedQuery<TInput extends Record<string, unknown>, TOutput extends PgPreparedQuery<any>>(
	cb: (placeholder: PreparePlaceholder<TInput>) => TOutput
): PrepareExecuteQuery<TInput, TOutput> {
	return (values: TInput) => cb(s.sql.placeholder).execute(values) as ReturnType<TOutput['execute']>;
}