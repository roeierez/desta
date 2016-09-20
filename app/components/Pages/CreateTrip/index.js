import React from 'react';
import {Grid, Row, Col, Panel} from 'react-bootstrap';
import QuickTripWizard from 'components/Modules/QuickTripWizard';
import TripMapView from 'components/Modules/TripMapView';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from 'redux-modules';
import ResizeablePanel from 'components/Modules/ResizeablePanel';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';

@connect(
    state => {
        return {...state.createTrip}
    },
    dispatch => bindActionCreators({
        ...actionCreators.createTrip,
    }, dispatch),
)
class CreateTrip extends React.Component {

    render() {
        return (
            <div className="createTripPage">
                <div className="welcome">Welcome To Desta</div>
            </div>
        );
    }
}

// <Card style={{borderRadius: "10px"}}>
//     <CardHeader style={{paddingBottom: '0px'}} title="New Trip">
//         <FontIcon style={{float: 'right', cursor:'pointer'}} className="material-icons">close</FontIcon>
//     </CardHeader>
//     <CardText style={{paddingTop: "0px"}}>
//         <AddDestinationForm />
//     </CardText>
// </Card>

export default CreateTrip;