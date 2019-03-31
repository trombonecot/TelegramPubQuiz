import { getQuestion } from '../common/index';

const countriesQuery = `SELECT DISTINCT ?city ?cityLabel ?population ?country ?countryLabel ?loc WHERE {
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

export async function getCountriesQuery() {

        const answers = await getQuestion(countriesQuery),
            cityLabel = answers[0].cityLabel.value,
            countryLabel = answers[0].countryLabel.value,
            countryLabel2 = answers[1].countryLabel.value,
            countryLabel3 = answers[2].countryLabel.value,
            countryLabel4 = answers[3].countryLabel.value;
    

    return {
        question: `What country has a city called ${cityLabel}?`, 
        answer: countryLabel, 
        possible: [countryLabel, countryLabel2, countryLabel3, countryLabel4]
     };
}
