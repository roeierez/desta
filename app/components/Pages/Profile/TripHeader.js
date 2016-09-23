import React, {PropTypes} from 'react';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'components/Modules/Avatar';
import moment from 'moment';
import {grey800, grey500} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';

class TripHeader extends React.Component {

    static propTypes = {
        trip: PropTypes.obj,
        updateTrip: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            editMode: false
        }
    }

    onTitleChange(event, newTitle) {
        let {trip, updateTrip} = this.props;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            trip = JSON.parse(JSON.stringify(trip));
            trip.name = newTitle;
            updateTrip(trip);
        }, 1000);
    }

    render() {
        let {trip} = this.props;
        var startDates = trip.destinations.map(d => moment(d.tripDates.startDate)),
            endDates = trip.destinations.map(d => moment(d.tripDates.endDate)),
            minDate = moment.min(startDates),
            maxDate = moment.max(endDates);

        let tripName = trip.name || trip.destinations.map(d => d.tripDestination.cityName).join(', ');
        return (
            <div className="trip-header">
                <Avatar id={trip.owner.facebookID} height={60} width={60} />
                <div onClick={() => {this.refs.input.focus(); this.refs.input.select();}} className="trip-title" style={{color: grey800}}>
                    <div className="trip-destinations">
                        {<TextField
                            onChange={this.onTitleChange.bind(this)}
                            underlineStyle={{visibility: 'hidden'}}
                            underlineFocusStyle={{visibility: 'visible'}}
                            ref="input" inputStyle={{ cursor:'pointer', color:grey800, width: "inherit"}}
                            style={{color:grey800, flex: 1, width: "inherit", fontSize: "20px"}}
                            defaultValue={tripName} />
                        }
                        <FontIcon style={{position: "absolute", right: -30, top: 10, color: grey800}} className="edit material-icons">{this.state.editMode ? "add" : "edit"}</FontIcon>
                    </div>
                    <div style={{color: grey500}} className="trip-dates">{`${minDate.format('ll')} - ${maxDate.format('ll')}`}</div>
                </div>
            </div>
        )
    }
}

export default TripHeader;
