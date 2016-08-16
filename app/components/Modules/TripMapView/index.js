import React from 'react';
import MapView from 'components/Modules/MapView';

class TripMapView extends React.Component {

    constructor(props) {
        super(props);
        this.onMarkerClick = this.onMarkerClick.bind(this);
    }

    onMarkerClick(marker) {
        var infowindow = new google.maps.InfoWindow({
            content: "test"
        });
        infowindow.open(this.refs.map, marker);
    }

    render() {
        var {selectedLocation, containerElementProps, workingTrip} = this.props,
            locations = workingTrip.destinations.map(d => {return {location: d.tripDestination.location}})
        return (
            <MapView locations={locations} selectedLocation={selectedLocation && {location: selectedLocation.location}} containerElementProps={containerElementProps}   />
        )
    }
}

export default TripMapView;