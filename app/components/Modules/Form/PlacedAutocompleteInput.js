import React from 'react';
import ReactDOM from 'react-dom';
import Geosuggest from 'react-geosuggest';

var PlacesAutocompleteInput = React.createClass({ // eslint-disable-line
    /**
     * Render the example app
     * @return {Function} React render function
     */
    render: function () {
        var fixtures = [
            {label: 'New York', location: {lat: 40.7033127, lng: -73.979681}},
            {label: 'Rio', location: {lat: -22.066452, lng: -42.9232368}},
            {label: 'Tokyo', location: {lat: 35.673343, lng: 139.710388}}
        ];

        return ( // eslint-disable-line
            <div className="geo-suggest-wrapper">
                <Geosuggest
                    ref="geoSuggest"
                    placeholder= { this.props.placeholder != null ? this.props.placeholder : "Where are you going?" }
                    initialValue={this.props.value && this.props.value.label}
                    inputClassName="form-control"
                    types={['(cities)']}
                    fixtures={fixtures}
                    autoActivateFirstSuggest={true}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    onSuggestSelect={this.onSuggestSelect}
                    onSuggestNoResults={this.onSuggestNoResults}>
                </Geosuggest>
            </div>
        );
    },

    /**
     * When the input receives focus
     */
    onFocus: function () {
        console.log('onFocus'); // eslint-disable-line
        this.props.onFocus && this.props.onFocus(this.props.value);
    },

    /**
     * When the input loses focus
     * @param {String} value The user input
     */
    onBlur: function (value) {
        console.log('onBlur', this.props.value); // eslint-disable-line
        this.props.onBlur(this.props.value);
        this.refs.geoSuggest.selectSuggest(this.props.value);
    },

    /**
     * When the input got changed
     * @param {String} value The new value
     */
    onChange: function (value) {
        console.log('input changes to :' + value); // eslint-disable-line
    },

    /**
     * When a suggest got selected
     * @param  {Object} suggest The suggest
     */
    onSuggestSelect: function (suggest) {
        console.log(suggest); // eslint-disable-line
        this.props.selectLocation(suggest);
        this.props.onChange(suggest);
    },

    /**
     * When there are no suggest results
     * @param {String} userInput The user input
     */
    onSuggestNoResults: function (userInput) {
        console.log('onSuggestNoResults for :' + userInput); // eslint-disable-line
    }
});

module.exports = PlacesAutocompleteInput