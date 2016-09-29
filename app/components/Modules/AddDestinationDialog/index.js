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
        submitButtonText: PropTypes.string,
        onRequestClose: PropTypes.func,
        onSubmit: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            destination: null,
            departDate: null,
            returnDate: null,
            friends: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.open != nextProps.open) {
            this.setState({
                destination: null,
                departDate: null,
                returnDate: null,
                friends: []
            });
        }
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

    handleSubmit() {
        this.props.onSubmit({
            tripDestination: this.state.destination,
            tripFriends: this.state.friends,
            tripDates: {
                startDate: formatShortDate(moment(this.state.departDate)),
                endDate: formatShortDate(moment(this.state.returnDate))
            },
            hotels: [],
            pois: [],
            notes: []
        });
    }

    handleClose() {
        this.props.onRequestClose();
    }

    render() {

        let canSubmit = this.state.departDate != null && this.state.returnDate != null && this.state.destination != null;
        const actions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={() => this.handleClose()}
            />,
            <FlatButton
                label={this.props.submitButtonText || "Create Trip"}
                primary={true}
                disabled={!canSubmit}
                onTouchTap={() => this.handleSubmit()}
            />
        ];


        return (
            <Popover
                style={{borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px"}}
                title={this.props.title || "New Trip"}
                     anchorEl = {this.props.anchorEl}
                    open={this.props.open}
                    onRequestClose={this.handleClose.bind(this)}
            >
                <div className="add-destination-form" style={{paddingLeft: "20px", paddingRight: "20px"}}>
                    <div className="top">
                        <FontIcon color={grey600} className="material-icons">place</FontIcon>
                        <PlacesAutocomplete
                            fullWidth={true}
                            onPlaceSelected={this.onDestinationChanged.bind(this)}
                            style={styles.topField}
                        />
                    </div>
                    <div className="middle">
                        <div className="date-wrapper">
                            <FontIcon color={grey600} className="material-icons">flight_takeoff</FontIcon>
                            <DatePicker onChange={this.onDepartDateChanged.bind(this)} floatingLabelText="Departing" mode="landscape" autoOk textFieldStyle={styles.leftDatePicker} hintText="Departing" container="inline" />
                        </div>
                        <div className="date-wrapper">
                            <FontIcon color={grey600} className="material-icons">flight_land</FontIcon>
                            <DatePicker onChange={this.onReturnDateChanged.bind(this)} floatingLabelText="Returning" mode="landscape" autoOk textFieldStyle={styles.rightDatePicker} hintText="Returning" container="inline" />
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="friends-wrapper">
                            <FontIcon color={grey600} className="material-icons">person</FontIcon>
                            <FCFriendsPicker
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
                        />,
                        <FlatButton
                            label={this.props.submitButtonText || "Create Trip"}
                            primary={true}
                            disabled={!canSubmit}
                            onTouchTap={() => this.handleSubmit()}
                        />
                    </div>
                </div>
            </Popover>
        );
    }
}

export default AddDestinationDialog;
