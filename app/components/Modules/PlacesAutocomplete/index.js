import React, {PropTypes} from 'react';
import Autocomplete from '../Autocomplete';

class PlacesAutocomplete extends React.Component {

    static propTypes = {
        style: PropTypes.object,
        onPlaceSelected: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.autocompleteService = new google.maps.places.AutocompleteService();
        this.geoCoder = new google.maps.Geocoder();
    }

    render() {
        return (
            <Autocomplete onSelect={this.onSelect.bind(this)} {...this.props.style} hintText="Type a city name" floatingLabelText="Where are you going?" search={this.searchCities.bind(this)} />
        );
    }

    onSelect(value) {
        if (value == null) {
            this.props.onPlaceSelected(null);
            return;
        }

        this.geoCoder.geocode({address: value.description}, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                let gmaps = results[0],
                    location = gmaps.geometry.location,
                    suggest = Object.assign({}, value);

                suggest.gmaps = gmaps;
                suggest.location = {
                    lat: location.lat(),
                    lng: location.lng()
                };
                suggest.cityName = suggest.description.split(',')[0];

                this.props.onPlaceSelected(suggest);

            }
        });
    }

    searchCities(text) {
        return new Promise((resolve, reject) => {
            this.autocompleteService.getPlacePredictions({types: ['(cities)'], input: text}, suggestions => {
                if (!suggestions) {
                    resolve([]);
                } else {
                    resolve(suggestions.map(s => ({
                        text: s.description,
                        value: s
                    })));
                }
            })
        });
    }
}

export default PlacesAutocomplete;