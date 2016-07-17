import {ButtonToolbar, Button, Glyphicon, Panel, Row, Col} from 'react-bootstrap';
import QuickCreateForm from './QuickCreateForm'
import React from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import DestinationsList from './DestinationsList';
import classNames from 'classnames';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class QuickTripWizard extends React.Component {

    constructor(props) {
        super(props);
        this.onSaveAndAddDestination = this.onSaveAndAddDestination.bind(this);
        this.onSaveAndCreateTrip = this.onSaveAndCreateTrip.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
    }


    onSaveAndAddDestination() {
        this.refs.quickCreateForm.submit();
    }

    onSaveAndCreateTrip() {
        this.onSaveAndAddDestination();
    }

    onSubmit(val) {
        this.props.addDestination(val);
        this.props.reset('QuickCreateTrip');
    }

    render () {
        var {workingTrip, workingDestination, selectLocation} = this.props;
        return (
            <div className="quickTripWizard">

                    {workingTrip.destinations.length > 0 && (
                            <div className="destinationPanel">
                                <DestinationsList {...this.props} destinations={workingTrip.destinations} />
                            </div>
                        )
                    }
                <Panel>
                    <QuickCreateForm onSaveAndAddDestination = {this.onSaveAndAddDestination}
                                     onSaveAndCreateTrip={this.onSaveAndCreateTrip}
                                     ref="quickCreateForm"
                                     destination={workingDestination}
                                     selectLocation={selectLocation}
                                     fields={['tripDestination', 'tripFriends', 'tripDates']}
                                     onSubmit={this.onSubmit} />
                </Panel>
            </div>
        );
    }
}
export default connect(undefined, { reset })(QuickTripWizard);