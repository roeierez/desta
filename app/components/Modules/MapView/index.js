import React from 'react';
import {GoogleMap, Marker} from "react-google-maps";
import { default as ScriptjsLoader } from "react-google-maps/lib/async/ScriptjsLoader";

const MapView =  (containerElementProps, onMarkerRightclick, onMapClick, markers) => {
    return (
        <section className="map-view">
            <ScriptjsLoader
                hostname={"maps.googleapis.com"}
                pathname={"/maps/api/js"}
                query={{ key: "AIzaSyD9D_WiUcmNrPPAzRVV6fc1hLpAxSXgmpc", libraries: "geometry,drawing,places" }}
                loadingElement={
                    <div>
                    </div>
                }
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
                        ref={(map) => console.log(map)}
                        defaultZoom={3}

                        defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
                    >
                        {markers && markers.map((marker, index) => {
                            return (
                                <Marker
                                    {...marker}
                                    onRightclick={() => onMarkerRightclick(index)} />
                            );
                        })}
                    </GoogleMap>
                }
            />
        </section>
    );
}

export default MapView;