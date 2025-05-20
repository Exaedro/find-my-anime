/**
 * Supported anime websites and their own selectors and scraper functions
 *
 * @type {Record<string, AnimeWebsite>}
 * @property {AnimeWebsite} url - Anime website url
 * @property {string} searchUrl - Anime search url
 * @property {Record<string, string>} selectors - Anime selectors
 * @property {Function} scrape - Principal scraper function
 * @property {Function} search - Search function
 *
 */
export declare const supportedWebsites: {
    "animefenix2.tv": {
        url: string;
        searchUrl: string;
        selectors: {
            name: string;
            image: string;
            synopsis: string;
            genres: string;
            type: string;
            year: string;
            views: string;
            episodesNumber: string;
            episodes: string;
            status: string;
            rating: string;
            votes: string;
        };
        scrape: (link: string, selectors: Record<string, string>, url?: string, episodes?: true | false) => Promise<{
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
                };
            };
            episodes?: {
                title: string;
                number: string;
                url: string;
            }[];
        }>;
        search: (query: string, searchUrl: string, url?: string) => Promise<string | null>;
    };
    "www3.animeflv.net": {
        url: string;
        searchUrl: string;
        selectors: {
            name: string;
            image: string;
            synopsis: string;
            genres: string;
            status: string;
            type: string;
            alternatives: string;
            rating: string;
            votes: string;
        };
        scrape: (link: string, selectors: Record<string, string>, url?: string, episodes?: true | false) => Promise<{
            name: string;
            image: string;
            synopsis: string;
            genres: string[];
            data: {
                alternatives: string[];
                status: string;
                type: string;
                score: {
                    rating: number;
                    votes: number;
                };
            };
        }>;
        search: (query: string, searchUrl: string, url?: string) => Promise<string>;
    };
};
