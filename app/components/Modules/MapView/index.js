import React from 'react';
import {GoogleMap, Marker, GoogleMapLoader} from "react-google-maps";

class MapView extends React.Component {

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
                            center={ centeredLocation && centeredLocation.location || { lat: -25.363882, lng: 131.044922 }}
                        >
                            {locations.map((dest, i) => {
                                return (
                                    <Marker
                                        position={dest.location}
                                        key={dest.placeId + i.toString()} />
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