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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AnimeScraper_instances, _AnimeScraper_website, _AnimeScraper_url, _AnimeScraper_selectors, _AnimeScraper_searchUrl, _AnimeScraper_validateLink, _AnimeScraper_extractWebsite;
// types
import { websiteAliases } from "./types.js";
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
    constructor(website) {
        _AnimeScraper_instances.add(this);
        _AnimeScraper_website.set(this, void 0);
        _AnimeScraper_url.set(this, void 0);
        _AnimeScraper_selectors.set(this, void 0);
        _AnimeScraper_searchUrl.set(this, void 0);
        const realWebsite = websiteAliases[website] || website || 'animefenix2.tv';
        __classPrivateFieldSet(this, _AnimeScraper_website, realWebsite, "f");
        // set url and selectors
        __classPrivateFieldSet(this, _AnimeScraper_url, supportedWebsites[__classPrivateFieldGet(this, _AnimeScraper_website, "f")].url, "f");
        __classPrivateFieldSet(this, _AnimeScraper_searchUrl, supportedWebsites[__classPrivateFieldGet(this, _AnimeScraper_website, "f")].searchUrl, "f");
        __classPrivateFieldSet(this, _AnimeScraper_selectors, {}, "f");
    }
    /**
     * Get anime information
     *
     * @param {string} query - Anime query
     * @param {getAnimeOptions} options - Anime scraper options
     * @returns {Promise<Anime | null>} - Anime data or null
     */
    async getAnime(query, options) {
        const linkRegex = /^https:\/\/[^\/\s]+\/.+/;
        // if the query is a link scrape it
        if (linkRegex.test(query)) {
            __classPrivateFieldGet(this, _AnimeScraper_instances, "m", _AnimeScraper_validateLink).call(this, query);
            __classPrivateFieldSet(this, _AnimeScraper_website, __classPrivateFieldGet(this, _AnimeScraper_instances, "m", _AnimeScraper_extractWebsite).call(this, query), "f");
            if (!supportedWebsites[__classPrivateFieldGet(this, _AnimeScraper_website, "f")])
                throw new Error('Domain not supported');
            // set selectors and url
            __classPrivateFieldSet(this, _AnimeScraper_selectors, supportedWebsites[__classPrivateFieldGet(this, _AnimeScraper_website, "f")].selectors, "f");
            __classPrivateFieldSet(this, _AnimeScraper_url, supportedWebsites[__classPrivateFieldGet(this, _AnimeScraper_website, "f")].url, "f");
            const anime = await supportedWebsites[__classPrivateFieldGet(this, _AnimeScraper_website, "f")]
                .scrape(query, __classPrivateFieldGet(this, _AnimeScraper_selectors, "f"), __classPrivateFieldGet(this, _AnimeScraper_url, "f"), options?.episodes);
            return anime;
        }
        if (!query || query.length < 0)
            throw new Error("Query is required");
        if (query.includes(':') || query.includes('/'))
            throw new TypeError('Link must be a valid URL');
        // if is not a link search for it
        __classPrivateFieldSet(this, _AnimeScraper_selectors, supportedWebsites[__classPrivateFieldGet(this, _AnimeScraper_website, "f")].selectors, "f");
        __classPrivateFieldSet(this, _AnimeScraper_url, supportedWebsites[__classPrivateFieldGet(this, _AnimeScraper_website, "f")].url, "f");
        const searchLink = await supportedWebsites[__classPrivateFieldGet(this, _AnimeScraper_website, "f")]
            .search(query, __classPrivateFieldGet(this, _AnimeScraper_searchUrl, "f"), __classPrivateFieldGet(this, _AnimeScraper_url, "f"));
        if (!searchLink)
            return null;
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
    async searchMany(query, sites) {
        if (!query)
            throw new Error('Query is required');
        if (!sites || !sites.length)
            throw new Error('Sites are required');
        if (!Array.isArray(sites))
            throw new Error('Sites must be an array of strings');
        if (!sites.every(site => typeof site === 'string'))
            throw new Error('Sites must be an array of strings');
        const results = await Promise.allSettled(sites.map(async (siteAlias) => {
            const domain = websiteAliases[siteAlias] || siteAlias;
            const config = supportedWebsites[domain];
            if (!config || typeof config.search !== "function")
                return null;
            const searchLink = await config.search(query, config.searchUrl, config.url);
            if (!searchLink)
                return null;
            return await this.getAnime(searchLink);
        }));
        return results
            .filter(res => res.status === "fulfilled")
            .map(res => res.value);
    }
}
_AnimeScraper_website = new WeakMap(), _AnimeScraper_url = new WeakMap(), _AnimeScraper_selectors = new WeakMap(), _AnimeScraper_searchUrl = new WeakMap(), _AnimeScraper_instances = new WeakSet(), _AnimeScraper_validateLink = function _AnimeScraper_validateLink(link, isSearch) {
    if (isSearch)
        return true;
    if (!link)
        throw new Error("Link is required");
    if (!link.match(/^https?:\/\//))
        throw new TypeError("Link must be a valid URL");
    return true;
}, _AnimeScraper_extractWebsite = function _AnimeScraper_extractWebsite(link) {
    return link.split("/")[2];
};
export default AnimeScraper;
