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
        this.props.updateTrip({...this.props.trip, [property]:value});
    }

    handleSelect (index, last) {
        this.setState({selectedIndex: index});
    }

    render() {
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
                    <HotelEditor hotels={this.props.trip.hotels}
                                 onChange={this.updateTrip.bind(this, 'hotels')} />
                </TabPanel>
                <TabPanel>
                    <POIEditor pois={this.props.trip.pois} 
                                onChange={this.updateTrip.bind(this, 'pois')} />
                </TabPanel>
                <TabPanel>
                    <TravellerNotesEditor notes={this.props.trip.notes} 
                                onChange={this.updateTrip.bind(this, 'notes')} />
                </TabPanel>               
            </Tabs>
        )
    }
}

export default TripInfoEditor;
