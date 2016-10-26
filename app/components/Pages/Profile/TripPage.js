import React from 'react';
import ReactDOM from 'react-dom';
import {formatTripName} from 'lib/tripUtils';
import {Link} from 'react-router';
import TripsCalendar from './TripsCalendar';
import TripsMap from './TripsMap';
import TripInfoEditor from 'components/Modules/TripInfoEditor';
import ResizeablePanel from 'components/Modules/ResizeablePanel';
import TripFriends from 'components/Modules/TripFriends';
import {browserHistory} from 'react-router'
import moment from 'moment';
import Avatar from 'components/Modules/Avatar';
import {findTripByIdOrLink} from 'lib/tripUtils';
import PageSpinner from 'components/Modules/PageSpinner';
import DestinationsList from 'components/Modules/DestinationsList';
import FontIcon from 'material-ui/FontIcon';
import AddDestinationDialog from 'components/Modules/AddDestinationDialog';
import TripHeader from './TripHeader';
import {grey300} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

let styles = {
    header: {
        backgroundColor: 'white',
        padding: '8px 16px',
        fontSize: '16px',
        fontFamily: 'Roboto',
        borderColor: grey300,
        borderBottom: "1px solid " + grey300
    },
    panel: {
        marginBottom: "20px"
    }
}

class TripPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            destinationID: null
        }
    }

    componentDidMount() {
        this.props.fetchTrip(this.props.params.id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params && this.props.params && this.props.params.id != nextProps.params.id) {
            this.props.fetchTrip(nextProps.params.id);
        }
    }

    componentWillUnmount() {
        this.showAddDestination(null);
    }

    onDestinationSelected(destination) {
        var trip = findTripByIdOrLink(this.props.trips, this.props.params.id);
        let index = trip.destinations.indexOf(destination);
        this.setState({destinationID: index});
        //browserHistory.push(`/${trip.owner.facebookID}/profile/trips/${trip.id}/destination/${index}`);
    }

    onDeleteDestination(destination) {
        var trip = JSON.parse(JSON.stringify(findTripByIdOrLink(this.props.trips, this.props.params.id)));
        let toDelete = trip.destinations.find(d => d.tripDates.startDate == destination.tripDates.startDate),
            index = trip.destinations.indexOf(toDelete);
        trip.destinations.splice(index, 1);
        this.props.updateTrip(trip).payload.promise.then(() => {

        })
    }

    showAddDestination(e) {
        this.anchorEl = e && e.currentTarget;
        this.props.showAddDestinationForm(e != null);
    }

    onAddDesintation(addMore, destination) {
        var trip = JSON.parse(JSON.stringify(findTripByIdOrLink(this.props.trips, this.props.params.id)));
        trip.destinations.push(destination);
        this.props.updateTrip(trip).payload.promise.then(() => {
            if (!addMore) {
                this.showAddDestination(null);
            } else {
                this.refs.addDestinationDialog.reset();
            }
        })
    }

    render() {
        var trip = findTripByIdOrLink(this.props.trips, this.props.params.id);

        if (trip == null || this.props.fetchingTrip) {
            return <PageSpinner />;
        }

        return (
            <div className="trip-page">
                <TripHeader updateTrip={this.props.updateTrip} trip={trip}/>
                <div className="trip-info">
                    <div className="left">
                        {
                            <ResizeablePanel expandable={true} style={{...styles.panel, flex: 0}} title="My Scheule">
                                <TripsCalendar trip={trip} {...this.props} />
                            </ResizeablePanel>
                        }
                        {
                            // <ResizeablePanel style={styles.panel} title="Friends with you">
                            //     <TripFriends classname="trip-friends" trip={trip} />
                            // </ResizeablePanel>
                        }
                        <Paper style={{display: 'flex', flexDirection: 'column'}} zDepth={2}>
                            <CardHeader style={styles.header} title="Destinations">
                                <FontIcon onTouchTap={(e) => this.showAddDestination(e)}
                                          ref={(icon) => {
                                              this.anchorEl = icon ? ReactDOM.findDOMNode(icon) : null;
                                          }}
                                          style={{
                                              float: 'right',
                                              top: "-3px",
                                              marginRight: "0px",
                                              cursor: 'pointer'
                                          }}
                                          className="material-icons">add</FontIcon>
                            </CardHeader>
                            <div style={{backgroundColor: 'white', overflowY: 'auto'}}>
                                <DestinationsList destinations={trip.destinations}
                                                  onDeleteDestination={this.onDeleteDestination.bind(this)}
                                                  onDestinationSelected={this.onDestinationSelected.bind(this)}/>
                            </div>
                        </Paper>
                    </div>
                    <div className="right">
                        <TripsMap trip={trip} {...this.props} />
                        <ReactCSSTransitionGroup
                            transitionName="mask-slide-left"
                            transitionEnterTimeout={1000}
                            transitionLeaveTimeout={1000}
                        >
                            {this.state.destinationID != null &&
                            <div key={this.props.destinationID} className="white-mask" style={{
                                //opacity: this.props.addDestinationFormVisible ? 1 : 0,
                                overflowY: 'hidden',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                backgroundColor: "rgba(255,255,255,0.8)"

                            }}>

                                <div zDepth={5} className="slider" style={{
                                    key: "0",
                                    position: 'absolute',
                                    top: 0,
                                    left: 100,
                                    width: "calc(100% - 100px)",
                                    height: "100%",
                                    opacity: 1,
                                    backgroundColor: 'white',
                                    boxShadow: "-10px 0 30px 0 rgba(0,0,0,.25)"
                                }}>
                                    <CardHeader style={styles.header} title="Huston">
                                        <FontIcon
                                            onTouchTap={() => {
                                                this.setState({destinationID:null});
                                            }}
                                            style={{
                                                float: 'right',
                                                top: "-3px",
                                                marginRight: "-5px",
                                                cursor: 'pointer'
                                            }}
                                            className="material-icons">close</FontIcon>
                                    </CardHeader>
                                    <TripInfoEditor {...this.props}
                                                    params={{destinationId: this.state.destinationID, id: this.props.params.id}}/>
                                </div>
                            </div>
                            }
                        </ReactCSSTransitionGroup>
                    </div>
                </div>
                <AddDestinationDialog open={this.props.addDestinationFormVisible && this.anchorEl != null}
                                      anchorEl={this.anchorEl}
                                      ref="addDestinationDialog"
                                      isNewTrip={false}
                                      onAddDestination={this.onAddDesintation.bind(this, true)}
                                      onCreateTrip={this.onAddDesintation.bind(this, false)}
                                      submitButtonText="Save Trip"
                                      onRequestClose={() => this.showAddDestination(null)}/>
            </div>
        );
    }
}
;

export default TripPage;