import { describe, it } from 'node:test' 
import assert from 'node:assert';

import AnimeScraper from '../dist/index.js';

describe('get anime', () => {
    it('should return error if no query is provided', async () => {
        const animeScraper = new AnimeScraper();

        await assert.rejects(async() => {
            await animeScraper.getAnime();
        }, {
            name: 'Error',
            message: 'Query is required'
        });
    });

    it('should return error if link is not a valid url', async () => {
        const animeScraper = new AnimeScraper();

        await assert.rejects(async() => {
            await animeScraper.getAnime('httttttps://animefenix2.tv/bloody-escape-jigoku-no-tousou-geki');
        }, {
            name: 'TypeError',
            message: 'Link must be a valid URL'
        });
    });

    it('should return error if domain is not supported', async () => {
        const animeScraper = new AnimeScraper();

        await assert.rejects(async() => {
            await animeScraper.getAnime('https://scraper.com/bloody-escape-jigoku-no-tousou-geki');
        }, {
            name: 'Error',
            message: 'Domain not supported'
        });
    });

    it('should return anime object', async () => {
        const animeScraper = new AnimeScraper();

        const anime = await animeScraper.getAnime('https://animefenix2.tv/bloody-escape-jigoku-no-tousou-geki');
        assert.strictEqual(typeof anime, 'object');
    })

    it('should return null if its not found anything', async () => {
        const animeScraper = new AnimeScraper();

        const anime = await animeScraper.getAnime('hola me llamo mango');
        assert.strictEqual(anime, null);
    });

    it('should return episodes if episodes option is provided', async () => {
        const animeScraper = new AnimeScraper();

        const anime = await animeScraper.getAnime('https://animefenix2.tv/enen-no-shouboutai-san-no-shou', { episodes: true });
        assert.strictEqual(anime.episodes.length > 0, true);
    });
    
    it('should return error if episodes its not supported by the website', async () => {
        const animeScraper = new AnimeScraper('animeflv');

        await assert.rejects(async() => {
            await animeScraper.getAnime('wonder egg priority', { episodes: true });
        }, {
            name: 'Error',
            message: 'Episodes are not supported on this website'
        });
    });
});

describe('search many', () => {
    it('should return error if no query is provided', async () => {
        const animeScraper = new AnimeScraper();

        await assert.rejects(async() => {
            await animeScraper.searchMany();
        }, {
            name: 'Error',
            message: 'Query is required'
        });
    });

    it('should return error if sites are not provided', async () => {
        const animeScraper = new AnimeScraper();

        await assert.rejects(async() => {
            await animeScraper.searchMany('enen no shouboutai');
        }, {
            name: 'Error',
            message: 'Sites are required'
        });
    });

    it('should return error if sites are not an array', async () => {
        const animeScraper = new AnimeScraper();

        await assert.rejects(async() => {
            await animeScraper.searchMany('enen no shouboutai', 'animefenix');
        }, {
            name: 'Error',
            message: 'Sites must be an array of strings'
        });
    });

    it('should return error if sites are not an array of strings', async () => {
        const animeScraper = new AnimeScraper();

        await assert.rejects(async() => {
            await animeScraper.searchMany('enen no shouboutai', [1, 2, 3]);
        }, {
            name: 'Error',
            message: 'Sites must be an array of strings'
        });
    });

    it('should return array of anime objects', async () => {
        const animeScraper = new AnimeScraper();

        const anime = await animeScraper.searchMany('enen no shouboutai', ["animefenix", "animeflv"]);
        assert.strictEqual(Array.isArray(anime), true);
    });
});