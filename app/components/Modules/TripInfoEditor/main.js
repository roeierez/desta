import React, {PropTypes} from 'react';
import List, {ListItem} from 'material-ui/List';
import {formatRange} from 'lib/dateUtils';
import FontIcon from 'material-ui/FontIcon';
import {purple500, lightBlue500, cyan500, teal500, lime500, deepOrange500, indigo500, grey700} from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import {findTripByIdOrLink} from 'lib/tripUtils';
import PageSpinner from 'components/Modules/PageSpinner';
import TravellerNoteEditor from './TravellerNoteEditor';
import PointOfInterestEditor from './PointOfInterestEditor';
import HotelEditor from './HotelEditor';

const styles = {
    section: {
        marginBottom: 20,
    },

    listItem: {
        zoom: "90%", backgroundColor: 'white'
    },

    rightIcon: {
        cursor: 'pointer'
    }
}

const DestinationEditorSection = ({title, onAdd, children}) => {
    return (
        <div style={styles.section}>
            <div className="edit-destination-title">
                <span style={{marginLeft: 25, color: grey700}}>{title}</span>
                <div className="toolbar">
                    <FontIcon onTouchTap={onAdd} style={{top: '2px', marginRight: '11px', cursor: 'pointer'}} className="icon material-icons">add</FontIcon>
                </div>
            </div>
            {children}
        </div>
    )
}

class DestinationEditor extends React.Component {

    static propTypes = {
        addDestinationItem: PropTypes.func,
        removeDestinationItem: PropTypes.func,
        updateDestinationItem: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            editingNote: false,
            editingPOI: false,
            editingHotel: false
        };
    }

    addNote(trip, destinationID, text) {
        this.props.addDestinationItem(trip, destinationID, 'notes', {text}).payload.promise.then(() => {
            this.setState({
                editingNote: false
            })
        });
    }

    addPOI(trip, destinationID, place) {
        this.props.addDestinationItem(trip, destinationID, 'pois', place).payload.promise.then(() => {
            this.setState({
                editingPOI: false
            })
        });
    }

    addHotel(trip, destinationID, hotel) {
        this.props.addDestinationItem(trip, destinationID, 'hotels', hotel).payload.promise.then(() => {
            this.setState({
                editingHotel: false
            })
        });
    }


    componentDidMount() {
        this.props.fetchTrip(this.props.params.id);
    }

    render() {
        let trip = findTripByIdOrLink(this.props.trips, this.props.params.id);
        if (trip == null || this.props.fetchingTrip) {
            return <PageSpinner />
        }

        let destinationID = +this.props.params.destinationId;
        let destination = trip.destinations[+this.props.params.destinationId],
            canEdit = this.props.loggedInUser.id == trip.owner.facebookID,
            {hotels, pois, notes} = destination;

        let colors = [purple500, lightBlue500, cyan500, teal500, lime500, deepOrange500, indigo500];
        let {addDestinationItem, removeDestinationItem, updateDestinationItem} = this.props;

        return (
            <div>
                <HotelEditor open={this.state.editingHotel == true} onCancel={() => this.setState({editingHotel: false})} onSubmit={(hotel) => this.addHotel(trip, destinationID, hotel)} />
                <DestinationEditorSection title="Hotels" onAdd={() => this.setState({editingHotel: true})}>
                    <List >
                        {hotels.map((h,i) => {
                            return (
                                <ListItem
                                    style={styles.listItem}
                                    leftAvatar={<Avatar
                                                          icon={<FontIcon className="material-icons">hotel</FontIcon>}
                                                          color={colors [ i % colors.length]}
                                                          backgroundColor="white"
                                                          size={35}
                                                          style={{margin: 5}}
                                                        />}
                                    primaryText={h.description}
                                    rightIcon={<FontIcon style={styles.rightIcon} onTouchTap={() => removeDestinationItem(trip, destinationID, 'hotels', h)} className="material-icons">delete_forever</FontIcon>}
                                    secondaryText={formatRange(h.startDate, h.endDate)} />
                            )
                        })}
                    </List>
                </DestinationEditorSection>
                <PointOfInterestEditor open={this.state.editingPOI == true} onCancel={() => this.setState({editingPOI: false})} onSubmit={(text) => this.addPOI(trip, destinationID, text)} />
                <DestinationEditorSection title="Points of Interest" onAdd={() => this.setState({editingPOI: true})}>
                    <List >
                        {pois.map((h,i) => {
                            return (
                                <ListItem
                                    style={styles.listItem}
                                    leftAvatar={<Avatar
                                                      icon={<FontIcon className="material-icons">place</FontIcon>}
                                                      color={colors [ i % colors.length]}
                                                      backgroundColor="white"
                                                      size={35}
                                                      style={{margin: 5}}
                                                    />}
                                    rightIcon={<FontIcon style={styles.rightIcon} onTouchTap={() => removeDestinationItem(trip, destinationID, 'pois', h)} className="material-icons">delete_forever</FontIcon>}
                                    primaryText={h.description}
                                    />
                            )
                        })}
                    </List>
                </DestinationEditorSection>
                <TravellerNoteEditor open={this.state.editingNote == true} onCancel={() => this.setState({editingNote: false})} onSubmit={(text) => this.addNote(trip, destinationID, text)} />
                <DestinationEditorSection title="Traveller Notes" onAdd={() => this.setState({editingNote: true})}>
                    <List >
                        {notes.map((h,i) => {
                            return (
                                <ListItem
                                    style={styles.listItem}
                                    leftAvatar={<Avatar
                                                      icon={<FontIcon className="material-icons">note_add</FontIcon>}
                                                      color={colors [ i % colors.length]}
                                                      backgroundColor="white"
                                                      size={35}
                                                      style={{margin: 5}}
                                                    />}
                                    rightIcon={<FontIcon style={styles.rightIcon} onTouchTap={() => removeDestinationItem(trip, destinationID, 'notes', h)} className="material-icons">delete_forever</FontIcon>}
                                    primaryText={h.text}
                                    />
                            )
                        })}
                    </List>
                </DestinationEditorSection>
            </div>
        );
    }
}

export default DestinationEditor;