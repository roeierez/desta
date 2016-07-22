import React from 'react';
import {Glyphicon, Panel, Button} from 'react-bootstrap';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var moment = require('moment');

const DestinationsList = ({destinations, removeDestination, createTrip}) => {
    if (!destinations || destinations.length == 0) {
        return <div></div>;
    }

    return (
        <div className="destinationsList">
            <ReactCSSTransitionGroup transitionLeaveTimeout={350} transitionName="component-fade"
                                     transitionAppear={true} transitionAppearTimeout={350}>
                {destinations.map((des, i) => (
                    <div key={moment(des.tripDates.startDate).format("Do MMM") + des.tripDestination.label}
                           className="destinationListItem">
                        <a onClick={function () {
                            removeDestination(des)
                        }} className="pull-right remove" href="javascript:void(0)" title="Remove"><i
                            className="glyphicon glyphicon-remove"></i></a>
                        <div className="destinationName">{des.tripDestination.label}</div>
                        <div
                            className="destinationDates">{`${moment(des.tripDates.startDate).format("Do MMM")} - ${moment(des.tripDates.endDate).format("Do MMM")}`}</div>
                        {/*<span className="destination-actions pull-right">*/}

                        {/*</span>*/}
                    </div>
                ))}
            </ReactCSSTransitionGroup>
            <ReactCSSTransitionGroup transitionLeaveTimeout={350} transitionName="component-fade"
                                     transitionAppear={true} transitionAppearTimeout={350}>
                {destinations.length > 0 && (
                    <div className="layout-center"><Button onClick={() => createTrip({destinations})} bsStyle="primary">Create My Trip</Button></div>
                )}
            </ReactCSSTransitionGroup>
        </div>
    )
}

export default DestinationsList;
