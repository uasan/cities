const minSearchStrLength = 3;


const API_URL = "http://127.0.0.1:3001/cities/";

export default class CitiesService {

    async loadCities (searchStr = "") {
        if (searchStr.length < minSearchStrLength) {
            return [];
        }

        let citiesList
        try{
            let res = await fetch(`${API_URL}${searchStr}`)
            citiesList = await res.json();
        } catch (e) {
            console.error(e)
            citiesList = [];
        }

        return citiesList;
    }
}