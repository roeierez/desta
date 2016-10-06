import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from 'redux-modules';

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