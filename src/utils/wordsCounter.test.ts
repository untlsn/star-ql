import { describe, it, expect } from 'vitest';
import { countWords, getMostUsedWordFromSource } from './wordsCounter';

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

describe('wordsCounter', () => {
	describe('getMostUsedWordFromSource', () => {
		it('return nothing when no one is present', () => {
			const res = getMostUsedWordFromSource(lorem, ['fake word', 'fake word2', 'not exist']);
			expect(res).toEqual([]);
		});
		it('return tuple of one when only one is present', () => {
			const res = getMostUsedWordFromSource(lorem, ['Lorem', 'fake word2', 'not exist']);
			expect(res).toEqual(['Lorem']);
		});
		it('return tuple of one when one have more occurrence then rest', () => {
			const res = getMostUsedWordFromSource('A B C D E A', ['C', 'A', 'B', 'D']);
			expect(res).toEqual(['A']);
		});
		it('return tuple of many when more then one string is equal in occurence', () => {
			const res = getMostUsedWordFromSource('A B C D E A C B', ['C', 'A', 'B', 'D']);
			expect(res)
				.contain('A')
				.contain('B')
				.contain('C');
		});
	});
	describe('countWords', () => {
		it('return counts of words', () => {
			const counts = countWords(lorem);

			expect(counts.map((it) => [it.word, it.count])).toEqual([
				[ 'Lorem', 1 ],         [ 'ipsum', 1 ],      [ 'dolor', 2 ],
				[ 'sit', 1 ],           [ 'amet,', 1 ],      [ 'consectetur', 1 ],
				[ 'adipiscing', 1 ],    [ 'elit,', 1 ],      [ 'sed', 1 ],
				[ 'do', 1 ],            [ 'eiusmod', 1 ],    [ 'tempor', 1 ],
				[ 'incididunt', 1 ],    [ 'ut', 2 ],         [ 'labore', 1 ],
				[ 'et', 1 ],            [ 'dolore', 2 ],     [ 'magna', 1 ],
				[ 'aliqua.', 1 ],       [ 'Ut', 1 ],         [ 'enim', 1 ],
				[ 'ad', 1 ],            [ 'minim', 1 ],      [ 'veniam,', 1 ],
				[ 'quis', 1 ],          [ 'nostrud', 1 ],    [ 'exercitation', 1 ],
				[ 'ullamco', 1 ],       [ 'laboris', 1 ],    [ 'nisi', 1 ],
				[ 'aliquip', 1 ],       [ 'ex', 1 ],         [ 'ea', 1 ],
				[ 'commodo', 1 ],       [ 'consequat.', 1 ], [ 'Duis', 1 ],
				[ 'aute', 1 ],          [ 'irure', 1 ],      [ 'in', 3 ],
				[ 'reprehenderit', 1 ], [ 'voluptate', 1 ],  [ 'velit', 1 ],
				[ 'esse', 1 ],          [ 'cillum', 1 ],     [ 'eu', 1 ],
				[ 'fugiat', 1 ],        [ 'nulla', 1 ],      [ 'pariatur.', 1 ],
				[ 'Excepteur', 1 ],     [ 'sint', 1 ],       [ 'occaecat', 1 ],
				[ 'cupidatat', 1 ],     [ 'non', 1 ],        [ 'proident,', 1 ],
				[ 'sunt', 1 ],          [ 'culpa', 1 ],      [ 'qui', 1 ],
				[ 'officia', 1 ],       [ 'deserunt', 1 ],   [ 'mollit', 1 ],
				[ 'anim', 1 ],          [ 'id', 1 ],         [ 'est', 1 ],
				[ 'laborum.', 1 ],
			]);
		});
	});
});