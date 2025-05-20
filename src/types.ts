import { supportedWebsites } from "./websites.js";

/**
 * Anime data object
 * 
 * @interface Anime
 * @property {string} name - Anime name
 * @property {string} image - Anime image
 * @property {string} synopsis - Anime synopsis
 * @property {string[]} genres - Anime genres
 * @property {number} episodes - Anime episodes
 * @property {string} status - Anime status
 * @property {number} episodes - Anime episodes
 * @property {string} status - Anime status
 * @property {number} views - Anime views
 * @property {number} score - Anime score
 * @property {number} votes - Anime votes
 * @property {string} type - Anime type
 * @property {string} year - Anime year
 * 
 * 
 * ### Episodes
 * 
 * `episodes` is an array of objects with the following properties:
 * 
 * - `title`: Episode title
 * - `number`: Episode number
 * - `url`: Episode url
 * 
 * ```ts
 * {
 *     title: string;
 *     number: string;
 *     url: string;
 * }[]
 * ```
 * 
 * ### Score
 * 
 * `score` is an object with the following properties:
 * 
 * - `rating`: Anime rating
 * - `votes`: Anime votes
 * 
 * ```ts
 * {
 *     rating?: number;
 *     votes?: number;
 * }
 * ``` 
 */
export interface Anime {
    name: string | undefined;
    image: string | undefined;
    synopsis: string | undefined;
    genres: string[] | undefined;
    data: {
        alternatives?: string[];
        episodes?: number;
        status?: string;
        type?: string;
        year?: string;
        views?: number;
        score?: {
            rating?: number;
            votes?: number;
        }
    },
    episodes?: {
        title: string;
        number: string;
        url: string;
    }[];
}

/**
 * Anime scraper options
 * 
 * @interface getAnimeOptions
 * @property {boolean} search - Search for anime
 * @property {boolean} episodes - Get episodes
 */
export type getAnimeOptions = {
    search?: true | false;
    episodes?: true | false;
}

/**
 * Supported anime websites
 */
export type AnimeWebsite = keyof typeof supportedWebsites;

/**
 * Website aliases
 */
export const websiteAliases: Record<string, AnimeWebsite> = {
  animefenix: "animefenix2.tv",
  animeflv: "www3.animeflv.net",
};