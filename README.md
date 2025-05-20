## English version
- [Click here to read this in english](#exa-anime-scraper-find-my-anime---english-readme)

# exa-anime-scraper (Find My Anime)

Paquete simple y súper fácil de utilizar para obtener datos de anime en español

> ⚠️ Advertencia: Este paquete usa scraping a diferentes paginas como **AnimeFLV**, no recomiendo su uso con un trafico elevado para prevenir baneos de parte de las paginas y Find My Anime deje de funcionar.

## Instalación
```bash
npm install exa-anime-scraper
```
## Como usarlo
Selecciona la pagina que vas a utilizar (Predeterminado: **AnimeFenix**)
```js
import FindMyAnime from 'exa-anime-scraper'

const animeScraper = new FindMyAnime('animeflv')
```

### getAnime()

Buscar anime por titulo
```js
await animeScraper.getAnime('wonder egg priority')
```

Resultado
```JSON
{
  "name": "Wonder Egg Priority",
  "image": "https://cdn.animemovil2.com/media/portadas/3402.webp",
  "synopsis": "La historia de este anime original comienza cuando la protagonista, una chica de 14 años llamada Ai Ohto, escucha una misteriosa voz mientras camina por la noche en su pueblo natal. Esa voz le otorga un huevo y le indica: “Si deseas cambiar el futuro, solo tienes que elegir ahora. Ahora, cree en ti misma y rompe el huevo”. ",
  "genres": [ "Recuentos de la vida" ],
  "data": {
    "type": "TV",
    "year": "2021",
    "status": "Finalizado",
    "episodes": 12,
    "views": 431,
    "score": { "rating": 10, "votes": 1 }
  }
}
```

También puedes obtener los episodios (Si es posible)
```js
await animeScraper.getAnime('kaiju', { episodes: true })
```

Resultado
```JSON
{                                                                                                                                                    
  "name": "Kaijuu 8-gou",
  "image": "https://cdn.animemovil2.com/media/portadas/4194.webp",
  "synopsis": "Monstruos grotescos parecidos a Godzilla llamados 'kaijuu' han estado apareciendo en Japón durante muchos años. Para combatir a estas bestias, una unidad militar de élite conocida como Cuerpo de Defensa arriesga sus vidas a diario para proteger a los civiles. Una vez que una criatura muere, los "barrenderos", que trabajan bajo la Professional Kaijuu Cleaner Corporation, se encargan de deshacerse de sus restos.',
  "genres": [ "Acción", "Shounen", "Ciencia Ficción" ],
  "data": {
    "type": "TV",
    "year": "2024",
    "status": "En emision",
    "episodes": 12,
    "views": 8062,
    "score": { "rating": 9.7, "votes": 42 }
  },
  "episodes": [
    {
      "title": "Kaijuu 8-gou",
      "number": "3",
      "url": "https://animefenix2.tv/ver/kaijuu-8-gou-3"
    },
    {
      "title": "Kaijuu 8-gou",
      "number": "2",
      "url": "https://animefenix2.tv/ver/kaijuu-8-gou-2"
    },
    {
      "title": "Kaijuu 8-gou",
      "number": "1",
      "url": "https://animefenix2.tv/ver/kaijuu-8-gou-1"
    }
  ]
}
```

Usando un link directo (no es necesario especificar la pagina):
```js
const animeScraper = new FindMyAnime('animefenix')

// Funciona igual con un link de AnimeFLV
await animeScraper.getAnime('https://www3.animeflv.net/anime/dandadan')
```

### searchMany()
Si quieres buscar un anime en varias paginas al mismo tiempo puedes utilizar el metodo `searchMany`
```js
await animeScraper.searchMany('enen no shouboutai', ['animefenix', 'animeflv']) // return array
```

## Gracias

Si te gusta este paquete, añademe en discord e insúltame `imaira.clip` :)

## exa-anime-scraper (Find My Anime) - English readme
Simple and super easy-to-use package to get anime data in Spanish

> ⚠️ Disclaimer: This package scrapes data from the websites **AnimeFenix** and **AnimeFLV**. Use it responsibly and avoid abusive requests to prevent bans or broken functionality.

## Installation
```bash
npm install exa-anime-scraper
```
## How to use
Select the website to use (default is **AnimeFenix**)
```js
import FindMyAnime from 'exa-anime-scraper'

const animeScraper = new FindMyAnime('animeflv')
```

### getAnime()

Search anime by title
```js
await animeScraper.getAnime('wonder egg priority')
```

Result
```JSON
{
  "name": "Wonder Egg Priority",
  "image": "https://cdn.animemovil2.com/media/portadas/3402.webp",
  "synopsis": "La historia de este anime original comienza cuando la protagonista, una chica de 14 años llamada Ai Ohto, escucha una misteriosa voz mientras camina por la noche en su pueblo natal. Esa voz le otorga un huevo y le indica: “Si deseas cambiar el futuro, solo tienes que elegir ahora. Ahora, cree en ti misma y rompe el huevo”. ",
  "genres": [ "Recuentos de la vida" ],
  "data": {
    "type": "TV",
    "year": "2021",
    "status": "Finalizado",
    "episodes": 12,
    "views": 431,
    "score": { "rating": 10, "votes": 1 }
  }
}
```

Get episodes too (if supported)
```js
await animeScraper.getAnime('kaiju', { episodes: true })
```

Result
```JSON
{                                                                                                                                                    
  "name": "Kaijuu 8-gou",
  "image": "https://cdn.animemovil2.com/media/portadas/4194.webp",
  "synopsis": "Monstruos grotescos parecidos a Godzilla llamados 'kaijuu' han estado apareciendo en Japón durante muchos años. Para combatir a estas bestias, una unidad militar de élite conocida como Cuerpo de Defensa arriesga sus vidas a diario para proteger a los civiles. Una vez que una criatura muere, los "barrenderos", que trabajan bajo la Professional Kaijuu Cleaner Corporation, se encargan de deshacerse de sus restos.',
  "genres": [ "Acción", "Shounen", "Ciencia Ficción" ],
  "data": {
    "type": "TV",
    "year": "2024",
    "status": "En emision",
    "episodes": 12,
    "views": 8062,
    "score": { "rating": 9.7, "votes": 42 }
  },
  "episodes": [
    {
      "title": "Kaijuu 8-gou",
      "number": "3",
      "url": "https://animefenix2.tv/ver/kaijuu-8-gou-3"
    },
    {
      "title": "Kaijuu 8-gou",
      "number": "2",
      "url": "https://animefenix2.tv/ver/kaijuu-8-gou-2"
    },
    {
      "title": "Kaijuu 8-gou",
      "number": "1",
      "url": "https://animefenix2.tv/ver/kaijuu-8-gou-1"
    }
  ]
}
```

Use a direct link (no need to specify the site):
```js
const animeScraper = FindMyAnime('animefenix')

// Still works with AnimeFLV link
await animeScraper.getAnime('https://www3.animeflv.net/anime/dandadan')
```

### searchMany()
If you want to search for an anime in AnimeFLV and AnimeFenix, you can use the method `searchMany`
```js
await animeScraper.searchMany('enen no shouboutai', ['animefenix', 'animeflv']) // return array
```

## Thanks

If you like it, please send me your favorite italian brainrot to my discord `imaira.clip` :)
