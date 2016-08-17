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

    onClusterRef(cluster){
        if (cluster != null) {
            this.cluster = cluster;
            if (this.props.locations && this.props.locations.length > 1) {
                cluster.fitMapToMarkers();
            }
            // if (this.props.locations && this.props.locations.length > 0) {
            //     cluster.fitMapToMarkers();
            // }
        }
    }

    componentDidUpdate(prevProps) {
        var {locations} = this.props;
        if (JSON.stringify(prevProps.locations) == JSON.stringify(this.props.locations)) {
            return;
        }


        var locations = this.props.locations;
        if (locations && locations.length > 1) {
            this.cluster.fitMapToMarkers();
        }
    }

    render() {
        var {locations, selectedLocation, containerElementProps} = this.props,
            centerLocation = selectedLocation || locations[0],
            extraProps = centerLocation && locations.length <= 1 ? {zoom: 7} : {};

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
                                 height: "100%",
                             }}
                        />
                    }
                    googleMapElement={
                        <GoogleMap
                            ref="map"

                            defaultCenter={{lat: -25.363882, lng: 131.044922}}

                            defaultOptions={{
                                styles: mapStyles,
                            }}
                            mapTypeControlOptions={{
                                mapTypeIds: [google.maps.MapTypeId.ROADMAP]
                            }}

                            defaultZoom={3}

                            {...extraProps}
                            center={ centerLocation && centerLocation.location || {
                                lat: -25.363882, lng: 131.044922
                            }}
                        >
                            {locations && locations.length > 0 && (
                                <MarkerClusterer ref={this.onClusterRef.bind(this)}
                                                 averageCenter
                                                 fitMapToMarkers={true}
                                                 enableRetinaIcons
                                                 gridSize={ 60 }>
                                    {locations.map((dest, i) => {
                                        return (
                                        dest.icon ?
                                            <OverlayView
                                                position={dest.location}
                                                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                                                <div>
                                                    <div style={{width:"45px", height:"45px", borderRadius: "22px", backgroundImage: `url(${dest.icon})`}} />
                                                </div>
                                            </OverlayView>
                                            :
                                            <Marker
                                                position={dest.location}
                                                shape={{coords:[22,22,23],type:'circle'}}
                                                optimized={false}
                                                icon={ new google.maps.MarkerImage(dest.icon, null, null, new google.maps.Point(13, 25))}
                                                onClick={this.onMarkerClick}
                                                key={dest.location.lat.toString() + dest.location.lng.toString()}>
                                            </Marker>

                                        )
                                    })}
                                </MarkerClusterer>
                            ) }
                        </GoogleMap>
                    }
                />
            </section>
        );
    }
}

export default MapView;