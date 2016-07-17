import React from 'react';
import {GoogleMap, Marker, GoogleMapLoader, InfoWindow} from "react-google-maps";
var mapStyles = require('./mapStyle.js');

class MapView extends React.Component {

    constructor(props) {
        super(props);
        this.onMarkerClick = this.onMarkerClick.bind(this);
    }

    componentDidUpdate () {
        var {selectedLocation, containerElementProps, workingTrip } = this.props;
        var locations = (selectedLocation ? [selectedLocation] : []).concat(workingTrip.destinations.map(d => d.tripDestination));
        //if (locations)
        if (workingTrip.destinations.length > 1) {
            var bounds = new google.maps.LatLngBounds();
            for (var i = 0; i < locations.length; ++i) {
                bounds.extend(new google.maps.LatLng(locations[i].location.lat, locations[i].location.lng))
            }
            this.refs.map && this.refs.map.fitBounds(bounds);
        }
    }

    onMarkerClick(marker) {
        var infowindow = new google.maps.InfoWindow({
            content: "test"
        });
        infowindow.open(this.refs.map, marker);
    }

    render() {
        var {selectedLocation, containerElementProps, workingTrip } = this.props;
        var locations = workingTrip.destinations.map(d => d.tripDestination),
            centeredLocation = selectedLocation || locations[0];

        return (
            <section className="map-view">
                <GoogleMapLoader
                    containerElement={
                        <div
                            {...containerElementProps}
                            style={{
                                height: "100%",
                            }}
                        />
                    }
                    googleMapElement={
                        <GoogleMap
                            ref="map"
                            defaultZoom={3}
                            defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
                            zoom={selectedLocation && 8 || 3}
                            defaultOptions={{
                                styles: mapStyles,
                            }}
                            center={ centeredLocation && centeredLocation.location || { lat: -25.363882, lng: 131.044922 }}
                        >
                            {locations.map((dest, i) => {
                                return (
                                    <Marker
                                        position={dest.location}
                                        onClick={this.onMarkerClick}
                                        key={dest.placeId + i.toString()}>
                                    </Marker>
                                )
                            })}
                        </GoogleMap>
                    }
                />
            </section>
        );
    }
}

export default MapView;