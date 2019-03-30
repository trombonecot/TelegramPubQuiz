import { getCountriesQuery } from './countries/index';

export async function getQuestion(type) {
    switch(type){
        case 'country':
        default:
            return getCountriesQuery()
    }
}