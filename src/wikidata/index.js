import { getCountriesQuery } from './countries/index';
import { getOscarsQuery } from './oscars/index';


export async function getQuestion(type) {
    switch(type){
        case 'oscars':
            return getOscarsQuery()
        case 'country':
        default:
            return getCountriesQuery()
    }
}