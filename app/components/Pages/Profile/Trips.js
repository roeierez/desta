
import React from 'react';
import TripsGallery from 'components/Modules/TripsGallery';

class Trips extends React.Component {

    render (){
        return (
            <TripsGallery trips= {this.props.trips} />
        );
    }
};

export default Trips;