
/**
 * Convert object to string of params
 *
 * @example
 * createSearchParams({ a: 5, c: 2, b: 'yes' }) -> '?a=5&c=2&b=yes'
 * createSearchParams({ a: 5, c: '', d: undefined }) -> '?a=5'
 * createSearchParams({}) -> ''
 */
export function createSearchParams(params: Record<string, any>): '' | `?${string}` {
	const query = Object.entries(params)
		.filter(([, value]) => value != undefined && value != '')
		.map(([key, value]) => `${key}=${value}`)
		.join('&');
	if (!query) return '';
	return `?${query}`;
}