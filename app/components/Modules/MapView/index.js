import React from 'react';
import {GoogleMap, Marker, GoogleMapLoader, InfoWindow, OverlayView} from "react-google-maps";
import {default as MarkerClusterer} from "react-google-maps/lib/addons/MarkerClusterer";
var mapStyles = require('./mapStyle.js');

class MapView extends React.Component {

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

    componentDidUpdate(prevProps) {
        var {locations, selectedLocation, containerElementProps} = this.props;

        if (this.props.heatmap) {
            if (!this.heatmap) {
                this.heatmap = new google.maps.visualization.HeatmapLayer({
                    data: (locations || []).concat(selectedLocation && [selectedLocation] || []).map(l => new google.maps.LatLng(l.location.lat, l.location.lng)),
                    map: this.refs.map.props.map
                });
            } else {
                this.heatmap.setData((locations || []).concat(selectedLocation && [selectedLocation] || []).map(l => new google.maps.LatLng(l.location.lat, l.location.lng)));
            }
        }
        else {
            if (this.heatmap) {
                this.heatmap.setMap(null);
            }

            if (locations && locations.length > 1 && JSON.stringify(prevProps.locations.map(l => l.location)) != JSON.stringify(this.props.locations.map(l => l.location))) {
                var bounds = new google.maps.LatLngBounds();
                this.props.locations.forEach(l => {
                    bounds.extend(new google.maps.LatLng(l.location.lat ,l.location.lng));
                });
                this.refs.map.fitBounds(bounds);
            }
        }
    }

    render() {
        var {locations, selectedLocation, containerElementProps, heatmap} = this.props,
            centerLocation = selectedLocation || locations[0],
            extraProps = centerLocation && locations.length <= 1 ? {zoom: 7} : {};

        if (heatmap) {
            extraProps.zoom = 3;
        }
        // var lines = [];
        // for (var i = 1; i < locations.length; ++i) {
        //     lines.push(<Polyline strokeColor="#fff" path={[locations[i - 1].location, locations[i].location]}/>)
        // }
        
        return (
            <section className="map-view">
                <GoogleMapLoader
                    containerElement={
                        <div className="map-container"
                             {...containerElementProps}
                             style={{

                             }}
                        />
                    }
                    googleMapElement={
                        <GoogleMap
                            ref="map"

                            defaultCenter={{lat: 0, lng: 0}}

                            defaultOptions={{
                                styles: mapStyles,
                            }}
                            mapTypeControlOptions={{
                                mapTypeIds: [google.maps.MapTypeId.ROADMAP]
                            }}

                            defaultZoom={2}

                            {...extraProps}
                            center={ centerLocation && centerLocation.location || {
                                lat: 0, lng: 0
                            }}
                        >
                            {!this.props.heatmap && locations && locations.length > 0 && (

                                    locations.map((dest, i) => {
                                        return (
                                            (dest.icon || dest.component) ?
                                            <OverlayView
                                                key={i.toString() + dest.location.lat.toString() + dest.location.lng.toString()}
                                                position={dest.location}
                                                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                                                { (
                                                    <div>
                                                        <div style={{width:"45px", height:"45px", borderRadius: "22px", backgroundImage: `url(${dest.icon})`}} />
                                                    </div>
                                                )}
                                            </OverlayView>
                                            :
                                            <Marker
                                                position={dest.location}
                                                shape={{coords:[22,22,23],type:'circle'}}
                                                optimized={false}
                                                icon={ new google.maps.MarkerImage(dest.icon, null, null, new google.maps.Point(13, 25))}
                                                onClick={this.onMarkerClick}
                                                key={i.toString() + dest.location.lat.toString() + dest.location.lng.toString()}>
                                            </Marker>

                                        )
                                    })

                            ) }
                        </GoogleMap>
                    }
                />
            </section>
        );
    }
}

export default MapView;