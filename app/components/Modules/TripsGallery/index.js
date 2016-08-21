import TripSummary from './TripSummary';
import React from 'react';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class TripsGallery extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var {trips} = this.props;
        return (
            <div className="trips-gallery">
                <ReactCSSTransitionGroup transitionLeaveTimeout={350} transitionName="component-fade"
                                         transitionAppear={true} transitionAppearTimeout={1000}>
                    {trips && trips.map(t => (
                        <div key={t.id} className="trip-wrapper">
                            <TripSummary shareTrip={this.props.enterShareMode} tripInfo={t}/>
                        </div>
                    ))}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}
export default TripsGallery