import { CheerioAPI } from "cheerio";
/**
 * Load html from url
 *
 * @param {string} url - Url to load
 * @returns {Promise<CheerioAPI>} - Cheerio object
 */
declare function loadHtml(url: string): Promise<CheerioAPI>;
export default loadHtml;
