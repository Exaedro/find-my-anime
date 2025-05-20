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
import { Anime, AnimeWebsite, getAnimeOptions } from "./types.js";
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
declare class AnimeScraper {
    #private;
    constructor(website?: AnimeWebsite);
    /**
     * Get anime information
     *
     * @param {string} query - Anime query
     * @param {getAnimeOptions} options - Anime scraper options
     * @returns {Promise<Anime | null>} - Anime data or null
     */
    getAnime(query: string, options?: getAnimeOptions): Promise<Anime | null>;
    /**
     * Search for anime on multiple websites
     *
     * @param {string} query - Anime query
     * @param {AnimeWebsite[]} sites - Anime websites
     * @returns {Promise<Anime[]>} - Animes data array
     */
    searchMany(query: string, sites: AnimeWebsite[]): Promise<Anime[]>;
}
export default AnimeScraper;
