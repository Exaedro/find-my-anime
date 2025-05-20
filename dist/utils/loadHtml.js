import { request } from "undici";
import { load } from "cheerio";
/**
 * Load html from url
 *
 * @param {string} url - Url to load
 * @returns {Promise<CheerioAPI>} - Cheerio object
 */
async function loadHtml(url) {
    const { body } = await request(url);
    const data = await body.text();
    const $ = load(data);
    return $;
}
export default loadHtml;
