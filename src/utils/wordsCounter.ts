/**
 * Search for most used strings from source.
 * Used to check which character name was most used in opening_crawl
 */
export function getMostUsedWordFromSource(text: string, source: string[]): string[] {
	let mostUsed: string[] = [];
	let mostUsedCount = 0;
	for (const element of source) {
		const length = text.match(new RegExp(element, 'g'))?.length;
		if (!length) continue;
		if (length == mostUsedCount) {
			mostUsed.push(element);
			continue;
		}
		if (length > mostUsedCount) {
			mostUsedCount = length;
			mostUsed = [element];
		}
	}
	return mostUsed;
}

/**
 * Count every word in text and hive enum of word: count
 * Used to count words in opening_crawl
 */
export function countWords(text: string): { word: string, count: number }[] {
	const wordsCount: Record<string, number> = {};
	for (const word of text.split(/\s+/)) {
		wordsCount[word] ||= 0;
		wordsCount[word]++;
	}
	return Object.entries(wordsCount).map(([word, count]) => ({ word, count }));
}