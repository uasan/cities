import React from 'react';
import _ from 'underscore';
import CitiesService from "./citiesService"
import './searchCity.css';

const inputDelay = 1000;

class SearchCity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchStr: "",
            citiesList: []
        }

        this.citiesService = new CitiesService();

        this.getSuggestions = _.debounce(this.getSuggestions.bind(this), inputDelay);
        this.onChange = this.onChange.bind(this);
    }


    async getSuggestions (searchStr) {
        const citiesList = await this.citiesService.loadCities(searchStr);
        this.setState({
            searchStr: searchStr,
            citiesList: citiesList
        })
    }


    onChange (event) {
        event.persist();
        this.getSuggestions(event.target.value)
    }

    render() {
        const datalist = this.state.citiesList.map((item, index) => {
            return (
                <option key={index} value={item} />
            );
        });

        return (
            <div className="searchInput">
            <label htmlFor="citySearch">
                City:
            </label>
                <input type="text" list="cities-list" id="citySearch" onChange={this.onChange} />
                <datalist id="cities-list">
                    {datalist}
                </datalist>
            </div>
        );
    }
}

export default SearchCity;