import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import HotelEditor from './HotelsEditor';
import POIEditor from './POIEditor';

class TripInfoEditor extends React.Component {

    updateTrip (property, value) {
        this.props.updateTrip({...this.props.trip, [property]:value});
    }

    render() {
        return (
            <Tabs
                onSelect={this.handleSelect}
                selectedIndex={0}
            >

                <TabList>
                    <Tab>Hotels</Tab>
                    <Tab>My Points</Tab>
                    <Tab>Traveler Notes</Tab>
                    <Tab>Transportation</Tab>
                </TabList>
                <TabPanel>
                    <HotelEditor hotels={this.props.trip.hotels}
                                 onHotelsChanged={this.updateTrip.bind(this, 'hotels')} />
                </TabPanel>
                <TabPanel>
                    <POIEditor pois={this.props.trip.pois} />
                </TabPanel>
                <TabPanel>
                    <div className="section-content">TBD</div>
                </TabPanel>
                <TabPanel>
                    <div className="section-content">TBD</div>
                </TabPanel>
            </Tabs>
        )
    }
}

export default TripInfoEditor;
