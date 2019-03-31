
import wdk from 'wikidata-sdk';
import rp from 'request-promise';

export async function getQuestion(query) {
    const url = await wdk.sparqlQuery(query)
    // request the generated URL with your favorite HTTP request library
    
    const result = await rp({ method: 'GET', url });
    
    const artists = JSON.parse(result),
        maxNumber = artists['results']['bindings'].length,
        random = Math.floor(Math.random() * (+maxNumber - +0)),
        random2 = Math.floor(Math.random() * (+maxNumber - +0)),
        random3 = Math.floor(Math.random() * (+maxNumber - +0)),
        random4 = Math.floor(Math.random() * (+maxNumber - +0)),
        artist = artists['results']['bindings'][random],
        artist2 = artists['results']['bindings'][random2],
        artist3 = artists['results']['bindings'][random3],
        artist4 = artists['results']['bindings'][random4];

    return [artist, artist2, artist3, artist4]
}