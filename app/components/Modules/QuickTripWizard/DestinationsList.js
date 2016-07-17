import React from 'react';
import { Glyphicon, Panel } from 'react-bootstrap';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

const DestinationsList = ({destinations, removeDestination}) => {
    if (!destinations || destinations.length == 0){
        return <div></div>;
    }

    return (
         <div className="destinationsList">
             <ReactCSSTransitionGroup transitionName="component-fade" transitionAppear={true} transitionAppearTimeout={500}>
             {destinations.map((des, i) => (
                 <Panel key={i.toString()} className="destinationListItem">
                     <a onClick={function(){removeDestination(des)}} className="pull-left remove" href="javascript:void(0)" title="Remove"><i className="glyphicon glyphicon-remove"></i></a>
                     <span className="destinationName pull-left">{des.tripDestination.label}</span>
                     <span className="destinationDates pull-right">{`${des.tripDates.startDate.format("Do MMM")} - ${des.tripDates.endDate.format("Do MMM")}`}</span>
                     {/*<span className="destination-actions pull-right">*/}

                     {/*</span>*/}
                 </Panel>
             ))}
             </ReactCSSTransitionGroup>
         </div>
    )
}

export default DestinationsList;
