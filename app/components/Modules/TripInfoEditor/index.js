import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import HotelEditor from './HotelsEditor';
import POIEditor from './POIEditor';
import TravellerNotesEditor from './TravellerNotesEditor';

class TripInfoEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0
        }
    }

    updateTrip (property, value) {
        let destination = this.props.destination,
            clonedTrip = JSON.parse(JSON.stringify(this.props.trip)),
            editedDestination = clonedTrip.destinations.find( d => d.tripDates.startDate == destination.tripDates.startDate && d.tripDates.endDate == destination.tripDates.endDate);

        editedDestination[property] = value;
        this.props.updateTrip(clonedTrip);
    }

    handleSelect (index, last) {
        this.setState({selectedIndex: index});
    }

    render() {
        let {destination} = this.props;
        return (
            <Tabs
                onSelect={this.handleSelect.bind(this)}
                selectedIndex={this.state.selectedIndex || 0}>
                <TabList>
                    <Tab><span className="font-icon font-icon-home">Hotels</span></Tab>
                    <Tab><span className="font-icon font-icon-notebook">My Points</span></Tab>
                    <Tab><span className="font-icon font-icon-notebook">Traveller Notes</span></Tab>                  
                </TabList>
                <TabPanel>
                    <HotelEditor hotels={destination.hotels}
                                 canEdit = {this.props.canEdit}
                                 onChange={this.updateTrip.bind(this, 'hotels')} />
                </TabPanel>
                <TabPanel>
                    <POIEditor pois={destination.pois}
                               canEdit = {this.props.canEdit}
                                onChange={this.updateTrip.bind(this, 'pois')} />
                </TabPanel>
                <TabPanel>
                    <TravellerNotesEditor notes={destination.notes}
                                          canEdit = {this.props.canEdit}
                                          onChange={this.updateTrip.bind(this, 'notes')} />
                </TabPanel>               
            </Tabs>
        )
    }
}

export default TripInfoEditor;
