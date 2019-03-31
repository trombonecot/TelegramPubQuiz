
import { getQuestion } from '../common/index';

export async function getOscarsQuery() {
    const query = `SELECT DISTINCT ?item ?itemLabel ?awardLabel ?time
            {
                ?item wdt:P106/wdt:P279* wd:Q3455803 ; # Items with the Occupation(P106) of Director(Q3455803) or a subclass(P279)
                    p:P166 ?awardStat .              # ... with an awarded(P166) statement
                ?awardStat pq:P805 ?award ;            # Get the award (which is "subject of" XXth Academy Awards)
                        ps:P166 wd:Q103360 .        # ... that has the value Academy Award for Best Director(Q103360)
                ?award wdt:P585 ?time .                # the "point of time" of the Academy Award
                SERVICE wikibase:label {               # ... include the labels
                    bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en"
                }
            }
            ORDER BY DESC(?time)`;


    const answers = await getQuestion(query);

    artistLabel = answers[0].itemLabel.value,
    awardsNumber = answers[0].awardLabel.value,
    awardsNumber2 = answers[1].awardLabel.value,
    awardsNumber3 = answers[2].awardLabel.value,
    awardsNumber4 = answers[3].awardLabel.value;

        
    return { 
        question: `In which ceremony did ${question.label} recieve an award?`,
        answer: awardsNumber,
        possibles: [awardsNumber,awardsNumber2,awardsNumber3,awardsNumber4]
    };
}