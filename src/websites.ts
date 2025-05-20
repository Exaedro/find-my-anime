import loadHtml from "./utils/loadHtml.js";

import { Anime } from "./types.js";

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
export const supportedWebsites = {
    "animefenix2.tv": {
        url: `https://animefenix2.tv`,
        searchUrl: `https://animefenix2.tv/directorio/anime?q=`,
        selectors: {
            name: "h1.text-4xl",
            image: "img#anime_image",
            synopsis: "p.text-gray-300",
            genres: "div.flex.flex-wrap > a",
            type: ".w-full ul.text-gray-300 li:nth-child(1)",
            year: ".w-full ul.text-gray-300 li:nth-child(3)",
            views: ".w-full ul.text-gray-300 li:nth-child(5)",
            episodesNumber: ".w-full ul.text-gray-300 li:nth-child(4)",
            episodes: "ul.divide-y",
            status: ".container .w-full a.block",
            rating: ".text-3xl:nth-child(1)",
            votes: ".text-3xl:nth-child(2)"
        },
        scrape: async (link: string, selectors: Record<string, string>, url?: string, episodes?: true | false) => {
            const $ = await loadHtml(link);

            const name = $(selectors.name).text();
            const image = $(selectors.image).attr("src");
            const synopsis = $(selectors.synopsis).text();

            const genres = $(selectors.genres)
                .text()
                .split("\n")
                .map(genre => genre.trim())
                .filter(genre => genre !== "");

            const episodesNumber = parseInt($(selectors.episodesNumber)
                .text()
                .split(" ")[2]
                ?.trim());

            const status = $(selectors.status).text()
                .replace('\n', '')
                .trim();

            const type = $(selectors.type)
            .text()
            .split(":")[1]
            .trim();

            const year = $(selectors.year)
            .text()
            .split(":")[1]
            .trim();

            const views = parseInt($(selectors.views)
                .text()
                .split(" ")[1]
                ?.trim());

            const rating = parseFloat($(selectors.rating).text().trim());
            const votes = parseInt($(selectors.votes)
            .text()
            .split(":")[1]
            .trim());

            let animeObject: Anime = {
                name,
                image,
                synopsis,
                genres,
                data: {
                    type,
                    year,
                    status,
                    episodes: episodesNumber,
                    views,
                    score: {
                        rating,
                        votes
                    }
                }
            };

            if (episodes) {
                const episodeList: { title: string; number: string; url: string }[] = [];

                $(selectors.episodes).find('li').each((_, elem) => {
                    const anchor = $(elem).find('a');
                    const href = anchor.attr('href')?.trim() || '';
                    const title = anchor.find('.flex-grow').clone().children().remove().end().text().trim();
                    const numberText = anchor.find('.font-semibold').text().trim();
                    const number = numberText.replace(/\D/g, '');

                    if (href && title && number) {
                        episodeList.push({ title, number, url: `${url}${href}` });
                    }
                });

                animeObject.episodes = episodeList;
            }

            return {
                ...animeObject
            };
        },
        search: async (query: string, searchUrl: string, url?: string) => {
            const searchUrlWithQuery = `${searchUrl}${query}`;
            const $ = await loadHtml(searchUrlWithQuery);
    
            const elem = $(".grid-animes > li").toArray()[0];
            const link = `${url}${$(elem).find("a").attr("href")}`;

            if (link.includes('undefined')) return null;
            
            return link;
        }
    },
    "www3.animeflv.net": {
        url: `https://www3.animeflv.net`,
        searchUrl: `https://www3.animeflv.net/browse?q=`,
        selectors: {
            name: "h1.Title",
            image: ".AnimeCover img",
            synopsis: ".Description p",
            genres: "nav.Nvgnrs > a",
            status: ".AnmStts span",
            type: "span.Type",
            alternatives: ".Ficha span.TxtAlt", 
            rating: "#votes_prmd",
            votes: "#votes_nmbr"
        },
        scrape: async (link: string, selectors: Record<string, string>, url?: string, episodes?: true | false) => {
            if (episodes)
                throw new Error("Episodes are not supported on this website");

            const $ = await loadHtml(link);

            const name = $(selectors.name).text();
            const image = `${url}${$(selectors.image).attr("src")}`;
            const synopsis = $(selectors.synopsis).text();

            const genres: string[] = []
            $(selectors.genres).each((_, elem) => {
                const genre = $(elem).text().trim();
                if (genre) genres.push(genre);
            });

            const status = $(selectors.status).text()
                .replace('\n', '')
                .trim();

            const type = $(selectors.type).text().trim();

            const alternatives: string[] = [];
            $(selectors.alternatives).each((_, elem) => {
                const alternative = $(elem).text().trim();
                if (alternative) alternatives.push(alternative);
            });

            const rating = parseFloat($(selectors.rating).text().trim());
            const votes = parseInt($(selectors.votes).text().trim());

            return {
                name,
                image,
                synopsis,
                genres,
                data: {
                    alternatives,
                    status,
                    type,
                    score: {
                        rating,
                        votes
                    }
                }
            };
        },
        search: async (query: string, searchUrl: string, url?: string) => {
            const searchUrlWithQuery = `${searchUrl}${query}`;
            const $ = await loadHtml(searchUrlWithQuery);
    
            const elem = $(".ListAnimes > li").toArray()[0];
            const link = `${url}${$(elem).find("a").attr("href")}`;
    
            return link;
        }
    }
}