export function createSearchParams(params: Record<string, any>) {
	const query = Object.entries(params)
		.filter(([, value]) => value)
		.map(([key, value]) => `${key}=${value}`)
		.join('&');
	if (!query) return '';
	return `?${query}`;
}