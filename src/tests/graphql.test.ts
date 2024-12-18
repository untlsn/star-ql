import { describe, it, beforeAll, expect, assert } from 'vitest';
import { yoga, yogaUrl } from '../index.ts';

describe('GraphQL', () => {
	beforeAll(() => {
		process.env.NODE_ENV = 'test';
	});
	describe('allFilms', async () => {
		it('Return films', async () => {
			const res = await yoga.fetch(`${yogaUrl}/graphql`, {
				method:  'POST',
				headers: { 'Content-Type': 'application/json' },
				body:    JSON.stringify({
					query: '{ allFilms { uid } }',
				}),
			});
			expect(res.status).toBe(200);
			assert.isNotNaN(+(await res.json()).data.allFilms[0].uid);
		});
	});
	describe('film', async () => {
		it('Return film of id', async () => {
			const res = await yoga.fetch(`${yogaUrl}/graphql`, {
				method:  'POST',
				headers: { 'Content-Type': 'application/json' },
				body:    JSON.stringify({
					query: '{ film(id: 1) { uid } }',
				}),
			});
			expect(res.status).toBe(200);
			expect((await res.json()).data.film.uid).toBe('1');
		});
	});
	describe('allPeoples', async () => {
		it('Return peoples', async () => {
			const res = await yoga.fetch(`${yogaUrl}/graphql`, {
				method:  'POST',
				headers: { 'Content-Type': 'application/json' },
				body:    JSON.stringify({
					query: '{ allPeoples { uid } }',
				}),
			});
			expect(res.status).toBe(200);
			assert.isNotNaN(+(await res.json()).data.allPeoples[0].uid);
		});
	});
	describe('allPeoplesFiltered', async () => {
		it('Return peoples that includes letter in name', async () => {
			const res = await yoga.fetch(`${yogaUrl}/graphql`, {
				method:  'POST',
				headers: { 'Content-Type': 'application/json' },
				body:    JSON.stringify({
					query: '{ allPeoplesFiltered(name: "W") { properties { name } } }',
				}),
			});
			expect(res.status).toBe(200);
			(await res.json()).data.allPeoplesFiltered.forEach((it) => {
				expect(it.properties.name.toLowerCase()).includes('w');
			});
		});
	});
	describe('people', async () => {
		it('Return film of id', async () => {
			const res = await yoga.fetch(`${yogaUrl}/graphql`, {
				method:  'POST',
				headers: { 'Content-Type': 'application/json' },
				body:    JSON.stringify({
					query: '{ film(id: 1) { uid } }',
				}),
			});
			expect(res.status).toBe(200);
			expect((await res.json()).data.film.uid).toBe('1');
		});
	});
	describe('allPlanets', async () => {
		it('Return peoples', async () => {
			const res = await yoga.fetch(`${yogaUrl}/graphql`, {
				method:  'POST',
				headers: { 'Content-Type': 'application/json' },
				body:    JSON.stringify({
					query: '{ allPeoples { uid } }',
				}),
			});
			expect(res.status).toBe(200);
			assert.isNotNaN(+(await res.json()).data.allPeoples[0].uid);
		});
	});
	describe('allPlanetsFiltered', async () => {
		it('Return planets that includes letter in name', async () => {
			const res = await yoga.fetch(`${yogaUrl}/graphql`, {
				method:  'POST',
				headers: { 'Content-Type': 'application/json' },
				body:    JSON.stringify({
					query: '{ allPlanetsFiltered(name: "W") { properties { name } } }',
				}),
			});
			expect(res.status).toBe(200);
			(await res.json()).data.allPlanetsFiltered.forEach((it) => {
				expect(it.properties.name.toLowerCase()).includes('w');
			});
		});
	});
	describe('planet', async () => {
		it('Return planet of id', async () => {
			const res = await yoga.fetch(`${yogaUrl}/graphql`, {
				method:  'POST',
				headers: { 'Content-Type': 'application/json' },
				body:    JSON.stringify({
					query: '{ planet(id: 1) { uid } }',
				}),
			});
			expect(res.status).toBe(200);
			expect((await res.json()).data.planet.uid).toBe('1');
		});
	});
	describe('allSpecies', async () => {
		it('Return species', async () => {
			const res = await yoga.fetch(`${yogaUrl}/graphql`, {
				method:  'POST',
				headers: { 'Content-Type': 'application/json' },
				body:    JSON.stringify({
					query: '{ allSpecies { uid } }',
				}),
			});
			expect(res.status).toBe(200);
			assert.isNotNaN(+(await res.json()).data.allSpecies[0].uid);
		});
	});
	describe('allSpeciesFiltered', async () => {
		it('Return species that includes letter in name', async () => {
			const res = await yoga.fetch(`${yogaUrl}/graphql`, {
				method:  'POST',
				headers: { 'Content-Type': 'application/json' },
				body:    JSON.stringify({
					query: '{ allSpeciesFiltered(name: "W") { properties { name } } }',
				}),
			});
			expect(res.status).toBe(200);
			(await res.json()).data.allSpeciesFiltered.forEach((it) => {
				expect(it.properties.name.toLowerCase()).includes('w');
			});
		});
	});
	describe('specie', async () => {
		it('Return specie of id', async () => {
			const res = await yoga.fetch(`${yogaUrl}/graphql`, {
				method:  'POST',
				headers: { 'Content-Type': 'application/json' },
				body:    JSON.stringify({
					query: '{ specie(id: 1) { uid } }',
				}),
			});
			expect(res.status).toBe(200);
			expect((await res.json()).data.specie.uid).toBe('1');
		});
	});
	describe('allVehicles', async () => {
		it('Return vehicles', async () => {
			const res = await yoga.fetch(`${yogaUrl}/graphql`, {
				method:  'POST',
				headers: { 'Content-Type': 'application/json' },
				body:    JSON.stringify({
					query: '{ allVehicles { uid } }',
				}),
			});
			expect(res.status).toBe(200);
			assert.isNotNaN(+(await res.json()).data.allVehicles[0].uid);
		});
	});
	describe('allVehiclesFiltered', async () => {
		it('Return vehicles that includes letter in name', async () => {
			const res = await yoga.fetch(`${yogaUrl}/graphql`, {
				method:  'POST',
				headers: { 'Content-Type': 'application/json' },
				body:    JSON.stringify({
					query: '{ allVehiclesFiltered(name: "W") { properties { name } } }',
				}),
			});
			expect(res.status).toBe(200);
			(await res.json()).data.allVehiclesFiltered.forEach((it) => {
				expect(it.properties.name.toLowerCase()).includes('w');
			});
		});
	});
	describe('vehicle', async () => {
		it('Return vehicle of id', async () => {
			const res = await yoga.fetch(`${yogaUrl}/graphql`, {
				method:  'POST',
				headers: { 'Content-Type': 'application/json' },
				body:    JSON.stringify({
					query: '{ vehicle(id: 4) { uid } }',
				}),
			});
			expect(res.status).toBe(200);
			expect((await res.json()).data.vehicle.uid).toBe('4');
		});
	});
	describe('allStarships', async () => {
		it('Return starships', async () => {
			const res = await yoga.fetch(`${yogaUrl}/graphql`, {
				method:  'POST',
				headers: { 'Content-Type': 'application/json' },
				body:    JSON.stringify({
					query: '{ allStarships { uid } }',
				}),
			});
			expect(res.status).toBe(200);
			assert.isNotNaN(+(await res.json()).data.allStarships[0].uid);
		});
	});
	describe('allStarshipsFiltered', async () => {
		it('Return starships that includes letter in name', async () => {
			const res = await yoga.fetch(`${yogaUrl}/graphql`, {
				method:  'POST',
				headers: { 'Content-Type': 'application/json' },
				body:    JSON.stringify({
					query: '{ allStarshipsFiltered(name: "W") { properties { name } } }',
				}),
			});
			expect(res.status).toBe(200);
			(await res.json()).data.allStarshipsFiltered.forEach((it) => {
				expect(it.properties.name.toLowerCase()).includes('w');
			});
		});
	});
	describe('starship', async () => {
		it('Return starship of id', async () => {
			const res = await yoga.fetch(`${yogaUrl}/graphql`, {
				method:  'POST',
				headers: { 'Content-Type': 'application/json' },
				body:    JSON.stringify({
					query: '{ starship(id: 2) { uid } }',
				}),
			});
			expect(res.status).toBe(200);
			expect((await res.json()).data.starship.uid).toBe('2');
		});
	});
	describe('Film.crawl_words_count', async () => {
		it('Return a array of words counts', async () => {
			const res = await yoga.fetch(`${yogaUrl}/graphql`, {
				method:  'POST',
				headers: { 'Content-Type': 'application/json' },
				body:    JSON.stringify({
					query: '{ allFilms { crawl_words_count { count word } } }',
				}),
			});
			expect(res.status).toBe(200);
			const wordsCount = (await res.json()).data.allFilms[0].crawl_words_count[0];
			assert.isNotNaN(wordsCount.count);
			assert.isString(wordsCount.word);
		});
	});
	describe('Film.crawl_popular_persons_count', async () => {
		it('Return a array of most common names', async () => {
			const res = await yoga.fetch(`${yogaUrl}/graphql`, {
				method:  'POST',
				headers: { 'Content-Type': 'application/json' },
				body:    JSON.stringify({
					query: '{ allFilms { crawl_popular_persons_count } }',
				}),
			});
			expect(res.status).toBe(200);
			assert.isArray((await res.json()).data.allFilms[0].crawl_popular_persons_count);
		});
	});
});