
import { queryTaxonomy } from 'wikidata-taxonomy';
import wdk from 'wikidata-sdk';
import request from 'request';
import rp from 'request-promise';

export async function getQuestion() {

    var options = { lang: 'en', brief: true };

    const SPARQL = `SELECT DISTINCT ?city ?cityLabel ?population ?country ?countryLabel ?loc WHERE {
        {
            SELECT (MAX(?population) AS ?population) ?country WHERE {
                ?city wdt:P31/wdt:P279* wd:Q515 .
                ?city wdt:P1082 ?population .
                ?city wdt:P17 ?country .
            }
            GROUP BY ?country
            ORDER BY DESC(?population)
        }
        ?city wdt:P31/wdt:P279* wd:Q515 .
        ?city wdt:P1082 ?population .
        ?city wdt:P17 ?country .
        ?city wdt:P625 ?loc .
        SERVICE wikibase:label {
            bd:serviceParam wikibase:language "en" .
        }
    }`;

    const url = await wdk.sparqlQuery(SPARQL)
// request the generated URL with your favorite HTTP request library

    const result = await rp({ method: 'GET', url }),
        cities = JSON.parse(result),
        maxNumber = cities['results']['bindings'].length,
        random = Math.floor(Math.random() * (+maxNumber - +0)),
        random2 = Math.floor(Math.random() * (+maxNumber - +0)),
        random3 = Math.floor(Math.random() * (+maxNumber - +0)),
        city = cities['results']['bindings'][random],
        city2 = cities['results']['bindings'][random2],
        city3 = cities['results']['bindings'][random3],
        cityLabel = city.cityLabel.value,
        countryLabel = city.countryLabel.value,
        countryLabel2 = city2.countryLabel.value,
        countryLabel3 = city3.countryLabel.value;

    return {'question': `What country has a city called ${cityLabel}?`, 'answer': countryLabel, 'possible': [countryLabel, countryLabel2, countryLabel3] };
}