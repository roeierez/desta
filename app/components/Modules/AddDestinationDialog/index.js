import React, {PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import {cyan400, grey700, grey600, cyan200} from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import PlacesAutocomplete from '../PlacesAutocomplete';
import FCFriendsPicker from 'components/Modules/FCFriendsPicker';
import moment from 'moment';
import {browserHistory} from 'react-router';
import {formatShortDate} from 'lib/dateUtils';
import Popover from 'material-ui/Popover';
import DateRangePicker from 'components/Modules/DateRangePicker';
import TextField from 'material-ui/TextField';

let styles = {
    topField: {
        width: '100%'
    },
    leftDatePicker: {
        width: "150px"
    },
    rightDatePicker: {
        width: "150px"
    },
    bottomField: {
        width: '100%'
    }
}

class AddDestinationDialog extends React.Component {

    static propTypes = {
        open: PropTypes.bool,
        title: PropTypes.string,
        isNewTrip: PropTypes.boolean,
        submitButtonText: PropTypes.string,
        onRequestClose: PropTypes.func,
        onCreateTrip: PropTypes.func,
        onAddDestination: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            keyIndex: 0,
            tripName: null,
            destination: null,
            departDate: null,
            returnDate: null,
            friends: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.open != nextProps.open) {
            this.reset();
        }
    }

    onTripNameChanged(o, name) {
        this.setState({tripName: name});
    }

    onReturnDateChanged(o, date) {
        this.setState({returnDate: date});
    }

    onDepartDateChanged(o, date) {
        this.setState({departDate: date});
    }

    onDestinationChanged(dest) {
        this.setState({destination: dest});
    }

    onFriendsChanged(friends) {
        this.setState({friends});
    }

    onDatesChange({startDate, endDate}) {
        this.setState({departDate: startDate, returnDate: endDate});
    }

    handleSubmit(createTrip) {
        let trip = {
            tripDestination: this.state.destination,
            tripFriends: this.state.friends,
            tripDates: {
                startDate: formatShortDate(moment(this.state.departDate)),
                endDate: formatShortDate(moment(this.state.returnDate))
            },
            hotels: [],
            pois: [],
            notes: []
        };
        if (createTrip) {
            this.props.onCreateTrip(trip, this.state.tripName);
        } else {
            this.props.onAddDestination(trip);
        }
    }

    handleClose() {
        this.props.onRequestClose();
    }

    reset() {
        this.setState({
            keyIndex: this.state.keyIndex + 1,
            tripName: null,
            destination: null,
            departDate: null,
            returnDate: null,
            friends: []
        });
    }

    render() {

        let {isNewTrip} = this.props,
            canSubmit = (!isNewTrip || this.state.tripName != null) && this.state.departDate != null && this.state.returnDate != null && this.state.destination != null;

        return (
            <Popover
                style={{borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px"}}
                title={this.props.title || "New Trip"}
                     anchorEl = {this.props.anchorEl}
                    open={this.props.open}
                    onRequestClose={this.handleClose.bind(this)}
            >
                <div className="add-destination-form" style={{paddingLeft: "20px", paddingRight: "20px"}}>
                    {
                        isNewTrip &&
                        <div className="top">
                            <FontIcon color={grey600} className="material-icons">place</FontIcon>
                            <TextField
                                key={"TripName" + this.state.keyIndex}
                                onChange={this.onTripNameChanged.bind(this)}
                                fullWidth={true}
                                floatingLabelText="Trip Name"
                                style={styles.topField}
                            />
                        </div>
                    }
                    <div className="top">
                        <FontIcon color={grey600} className="material-icons">place</FontIcon>
                        <PlacesAutocomplete
                            key={"PlacesAutocomplete" + this.state.keyIndex}
                            fullWidth={true}
                            onPlaceSelected={this.onDestinationChanged.bind(this)}
                            style={styles.topField}
                        />
                    </div>
                    <div className="middle">
                        <FontIcon color={grey600} className="material-icons">date_range</FontIcon>
                        <DateRangePicker key={"DateRangePicker" + this.state.keyIndex} onChange={this.onDatesChange.bind(this)} />
                    </div>
                    <div className="bottom">
                        <div className="friends-wrapper">
                            <FontIcon color={grey600} className="material-icons">person</FontIcon>
                            <FCFriendsPicker
                                key={"FCFriendsPicker" + this.state.keyIndex}
                                fullWidth={true}
                                onChange={this.onFriendsChanged.bind(this)}
                                style={styles.bottomField}
                            />
                        </div>
                    </div>
                    <div className="actions">
                        <FlatButton
                            label="Cancel"
                            secondary={true}
                            onTouchTap={() => this.handleClose()}
                        />
                        {
                            <FlatButton
                                label="Add Destination"
                                primary={!isNewTrip}
                                secondary = {isNewTrip}
                                disabled={!canSubmit}
                                onTouchTap={() => this.handleSubmit(false)}
                            />
                        }
                        <FlatButton
                            label={this.props.submitButtonText || "Create Trip"}
                            primary={true}
                            disabled={!canSubmit}
                            onTouchTap={() => this.handleSubmit(true)}
                        />
                    </div>
                </div>
            </Popover>
        );
    }
}

export default AddDestinationDialog;
