import React from 'react';
import {TextInput} from 'components/Modules/Form';
import {reduxForm} from 'redux-form';
import {PlacesAutocompleteInput} from 'components/Modules/Form';
import {Row, FormGroup, FormControl, HelpBlock, ControlLabel, Button, Glyphicon} from 'react-bootstrap';
import {RangePicker} from 'components/Modules/Form';
import FCFriendsPicker from 'components/Modules/FCFriendsPicker';
import moment from 'moment';
import {parseShortDate} from 'lib/dateUtils';
import {isBookedDate} from 'lib/tripUtils';
import {connect} from 'react-redux';
import classNames from 'classnames';

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

function hasDates(tripDates) {
    return tripDates.value && tripDates.value.startDate && tripDates.value.endDate;
}

var form = reduxForm({
    form: 'QuickCreateTrip',
    fields: ['tripDestination', 'tripDates', 'tripFriends'],
    touchOnChange: true, // react-widgets DateTimePicker doesn't blur
    validate(travel) {
        var errors = {};// {tripDestination: 'Test Error'};
        return errors
    }
})

const QuickCreateForm = ({workingTrip, onSaveAndAddDestination, onSaveAndCreateTrip, fields, selectLocation}) => {
    let isInvalidDate = (date) => {
            return isBookedDate(workingTrip, date);
        };

    return (
        <div className="quick-create-form">
            <form>
                <ReactCSSTransitionGroup transitionEnterTimeout={0} transitionLeaveTimeout={350} transitionName="component-fade"
                                         transitionAppear={true} transitionAppearTimeout={350}>
                    <FormGroup key="1" controlId="tripDestination">
                        <PlacesAutocompleteInput selectLocation={selectLocation}
                                                 types={["(cities)"]} {...fields.tripDestination}/>
                    </FormGroup>
                    {fields.tripDestination.value != '' && (
                        <FormGroup key="2" controlId="tripDates">
                            <RangePicker isInvalidDate={isInvalidDate} placeholder="When is your trip" {...fields.tripDates} />
                        </FormGroup>
                    )}
                    {hasDates(fields.tripDates) && (
                        <FormGroup key="3" controlId="tripFriends">
                            <FCFriendsPicker inputProps={{placeholder:"Who is coming with you?"}} {...fields.tripFriends} />
                            {/*<FormControl placeholder="Who is coming with you?" type="text" {...fields.tripFriends}/>*/}
                        </FormGroup>
                    )}
                </ReactCSSTransitionGroup>
            </form>

            <ReactCSSTransitionGroup transitionEnterTimeout={0} transitionLeave={false} transitionLeaveTimeout={0} transitionName="component-fade"
                                     transitionAppear={true} transitionAppearTimeout={350}>
                {hasDates(fields.tripDates) && (
                    <div className="layout-center">
                        <Button onClick={onSaveAndAddDestination} bsStyle="primary">
                            <span>Add Destination</span>
                        </Button>
                    </div>
                )}
            </ReactCSSTransitionGroup>
        </div>

    )
}

export default form(QuickCreateForm);
//export default connect(mapStateToProps)(form(QuickCreateForm));
