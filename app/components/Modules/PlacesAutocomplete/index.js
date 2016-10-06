import React, {PropTypes} from 'react';
import Autocomplete from '../Autocomplete';

class PlacesAutocomplete extends React.Component {

    static propTypes = {
        style: PropTypes.object,
        placeType: PropTypes.string,
        onPlaceSelected: PropTypes.func
    }

    constructor(props) {
        super(props);
        try {
            this.autocompleteService = new google.maps.places.AutocompleteService();
            this.geoCoder = new google.maps.Geocoder();
        }
        catch(e){
            
        }
    }

    render() {
        return (
            <Autocomplete {...this.props} onSelect={this.onSelect.bind(this)} {...this.props.style} hintText={this.props.hintText || "Type a city name"} floatingLabelText={this.props.floatingLabelText || "Where are you going?"} search={this.searchPlaces.bind(this)} />
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

    searchPlaces(text) {
        let options = {
            input: text
        };

        if (this.props.placeType != 'all') {
            options.types = [`(${this.props.placeType || "cities"})`];
        }
        return new Promise((resolve, reject) => {
            this.autocompleteService.getPlacePredictions(options, suggestions => {
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