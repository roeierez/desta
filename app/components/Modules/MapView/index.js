import React from 'react';
import {GoogleMap, Marker, GoogleMapLoader, InfoWindow, Polyline} from "react-google-maps";
import {default as MarkerClusterer} from "react-google-maps/lib/addons/MarkerClusterer";
var mapStyles = require('./mapStyle.js');

class MapView extends React.Component {

    constructor(props) {
        super(props);
        this.onMarkerClick = this.onMarkerClick.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.workingTrip.destinations == this.props.workingTrip.destinations) {
            return;
        }

        var {selectedLocation, containerElementProps, workingTrip} = this.props;
        var locations = (selectedLocation ? [selectedLocation] : []).concat(workingTrip.destinations.map(d => d.tripDestination));
        if (locations)
            if (workingTrip.destinations.length > 1) {
                this.refs.cluster.fitMapToMarkers();
            }
    }

    onMarkerClick(marker) {
        var infowindow = new google.maps.InfoWindow({
            content: "test"
        });
        infowindow.open(this.refs.map, marker);
    }

    render() {
        var {selectedLocation, containerElementProps, workingTrip} = this.props;
        var locations = workingTrip.destinations.map(d => d.tripDestination),
            centeredLocation = selectedLocation || locations[0],
            lines = [];

        for (var i = 1; i < locations.length; ++i) {
            lines.push(<Polyline strokeColor="#fff" path={[locations[i - 1].location, locations[i].location]}/>)
        }

        return (
            <section className="map-view">
                <GoogleMapLoader
                    containerElement={
                        <div className="map-container"
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
                            defaultCenter={{lat: -25.363882, lng: 131.044922}}
                            zoom={selectedLocation && 8 || 3}
                            defaultOptions={{
                                styles: mapStyles,
                            }}
                            mapTypeControlOptions={{
                                mapTypeIds: [google.maps.MapTypeId.ROADMAP]
                            }}
                            center={ centeredLocation && centeredLocation.location || {
                                lat: -25.363882,
                                lng: 131.044922
                            }}
                        >
                            <MarkerClusterer ref="cluster"
                                             averageCenter
                                             fitMapToMarkers={true}
                                             enableRetinaIcons
                                             gridSize={ 60 }
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
                            </MarkerClusterer>
                        </GoogleMap>
                    }
                />
            </section>
        );
    }
}

export default MapView;