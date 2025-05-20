/**
 *   ______ _           _   __  __                        _                
 *  |  ____(_)         | | |  \/  |           /\         (_)               
 *  | |__   _ _ __   __| | | \  / |_   _     /  \   _ __  _ _ __ ___   ___ 
 *  |  __| | | '_ \ / _` | | |\/| | | | |   / /\ \ | '_ \| | '_ ` _ \ / _ \
 *  | |    | | | | | (_| | | |  | | |_| |  / ____ \| | | | | | | | | |  __/
 *  |_|    |_|_| |_|\__,_| |_|  |_|\__, | /_/    \_\_| |_|_|_| |_| |_|\___|
 *                                  __/ |
 *                                 |___/                                   
 *
 * Simple package to get anime data in spanish
 * Paquete simple para obtener datos de anime en español
 * 
 * Project: https://github.com/Exaedro/find-my-anime
 * Discord: imaira.clip
 * 
 * @author Exaedro
 * @license MIT
 * @version 4.0.0
 */

// types
import { Anime, AnimeWebsite, websiteAliases, getAnimeOptions } from "./types.js";
import { supportedWebsites } from "./websites.js";

/**
 * @class AnimeScraper
 * 
 * @description Class to scrape anime information
 * @param {AnimeWebsite} website - Anime website
 * @example
 * ```ts
 * const animeScraper = new AnimeScraper('animefenix');
 * ```
 * 
 * ### Methods
 * - `getAnime(query: string, options?: getAnimeOptions): Promise<Anime | null>`
 * - `searchMany(query: string, sites: AnimeWebsite[]): Promise<Anime[]>`
 * 
 * ### Example
 * ```ts
 * const animeScraper = new AnimeScraper('animefenix');
 *
 * const anime = await animeScraper.getAnime('https://animefenix2.tv/bloody-escape-jigoku-no-tousou-geki');
 *
 * console.log(anime);
 * ```
 */
class AnimeScraper {
    #website: AnimeWebsite;
    #url: string;
    #selectors: Record<string, string>;
    #searchUrl: string;

    constructor(website?: AnimeWebsite) {
        const realWebsite = websiteAliases[website as string] || website || 'animefenix2.tv';
        this.#website = realWebsite as AnimeWebsite;

        // set url and selectors
        this.#url = supportedWebsites[this.#website].url;
        this.#searchUrl = supportedWebsites[this.#website].searchUrl;
        this.#selectors = {};
    }

    /**
     * Get anime information
     * 
     * @param {string} query - Anime query
     * @param {getAnimeOptions} options - Anime scraper options
     * @returns {Promise<Anime | null>} - Anime data or null
     */
    public async getAnime(
        query: string,
        options?: getAnimeOptions
    ): Promise<Anime | null> {
        const linkRegex = /^https:\/\/[^\/\s]+\/.+/

        // if the query is a link scrape it
        if (linkRegex.test(query)) {
            this.#validateLink(query);
            this.#website = this.#extractWebsite(query);

            if (!supportedWebsites[this.#website])
                throw new Error('Domain not supported');

            // set selectors and url
            this.#selectors = supportedWebsites[this.#website].selectors;
            this.#url = supportedWebsites[this.#website].url;

            const anime = await supportedWebsites[this.#website]
                .scrape(
                    query,
                    this.#selectors,
                    this.#url,
                    options?.episodes
                );

            return anime;
        }

        if (!query || query.length < 0) 
            throw new Error("Query is required");

        if (query.includes(':') || query.includes('/'))
            throw new TypeError('Link must be a valid URL');

        // if is not a link search for it
        this.#selectors = supportedWebsites[this.#website].selectors;
        this.#url = supportedWebsites[this.#website].url;

        const searchLink = await supportedWebsites[this.#website]
            .search(
                query,
                this.#searchUrl,
                this.#url
            );

        if (!searchLink) return null;

        const anime = await this.getAnime(searchLink, { episodes: options?.episodes });

        return anime;
    }

    /**
     * Search for anime on multiple websites
     * 
     * @param {string} query - Anime query
     * @param {AnimeWebsite[]} sites - Anime websites
     * @returns {Promise<Anime[]>} - Animes data array
     */
    public async searchMany(query: string, sites: AnimeWebsite[]): Promise<Anime[]> {
        if (!query) throw new Error('Query is required');
        if (!sites || !sites.length) throw new Error('Sites are required');
        if (!Array.isArray(sites)) throw new Error('Sites must be an array of strings');
        if (!sites.every(site => typeof site === 'string')) throw new Error('Sites must be an array of strings');

        const results = await Promise.allSettled(sites.map(async (siteAlias) => {
            const domain = websiteAliases[siteAlias] || siteAlias;
            const config = supportedWebsites[domain];
            if (!config || typeof config.search !== "function") return null;

            const searchLink = await config.search(query, config.searchUrl, config.url);
            if (!searchLink) return null;
            return await this.getAnime(searchLink);
        }));

        return results
            .filter(res => res.status === "fulfilled")
            .map(res => (res as PromiseFulfilledResult<Anime>).value);
    }

    /**
     * Validate link
     * 
     * @param {string} link - Anime link
     * @param {boolean} isSearch - Is search
     * @returns {boolean} - Is valid
     */
    #validateLink(link: string, isSearch?: boolean): boolean {
        if (isSearch)
            return true;

        if (!link)
            throw new Error("Link is required");

        if (!link.match(/^https?:\/\//))
            throw new TypeError("Link must be a valid URL");

        return true;
    }

    /**
     * Extract website from link
     * 
     * @param {string} link - Anime link
     * @returns {AnimeWebsite} - Anime website
     */
    #extractWebsite(link: string): AnimeWebsite {
        return link.split("/")[2] as AnimeWebsite;
    }
}

export default AnimeScraper;