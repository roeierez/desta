import React from 'react';
import { TextInput } from 'components/Modules/Form';
import { reduxForm } from 'redux-form';
import {PlacesAutocompleteInput} from 'components/Modules/Form';
import { Row, FormGroup, FormControl, HelpBlock, ControlLabel, Button, Glyphicon } from 'react-bootstrap';
import { RangePicker } from 'components/Modules/Form';
import { connect } from 'react-redux';
import classNames from 'classnames';

var mapStateToProps = state => state;

var form = reduxForm({
    form: 'QuickCreateTrip',
    fields: ['tripDestination', 'tripDates', 'tripFriends'],
    touchOnChange: true, // react-widgets DateTimePicker doesn't blur
    validate(travel) {
        var errors = {};// {tripDestination: 'Test Error'};
        return errors
    }
})

const QuickCreateForm = ({onSaveAndAddDestination, onSaveAndCreateTrip, fields, selectLocation}) => {
    return (
        <div className="quick-create-form">
            <form>
                    <FormGroup controlId="tripDestination">
                        <ControlLabel>Where are you going?</ControlLabel>
                        <PlacesAutocompleteInput selectLocation={selectLocation} types={["(cities)"]} {...fields.tripDestination}/>
                    </FormGroup>
                    <FormGroup className={classNames({hidden: fields.tripDestination.value == ''})} controlId="tripDates">
                        <ControlLabel>When is your trip?</ControlLabel>
                        <RangePicker {...fields.tripDates} />
                    </FormGroup>
                    <FormGroup className={classNames({hidden: fields.tripDates.value == ''})} controlId="tripFriends">
                        <ControlLabel>Who is coming with you?</ControlLabel>
                        <FormControl type="text" {...fields.tripFriends}/>
                    </FormGroup>
            </form>

            <div className={classNames('pull-right', {hidden: fields.tripDates.value == ''})}>
                <a onClick={onSaveAndAddDestination}  href="#" className="pull-right icon-link-circle"><span>+</span></a>
            </div>
            <div className={classNames('pull-left', {hidden: fields.tripDates.value == ''})}>
                <Button onClick={onSaveAndCreateTrip} bsSize="small" bsStyle="success"><span>Create Trip</span>
                </Button>
            </div>
        </div>

    )
}

export default form(QuickCreateForm);
//export default connect(mapStateToProps)(form(QuickCreateForm));
