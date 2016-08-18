import React from 'react';
import MapView from 'components/Modules/MapView'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from 'redux-modules';
import VisitedCityListItem from './VisitedCityListItem';
import ResizeablePanel from 'components/Modules/ResizeablePanel';

@connect(
    state => {
        return {...state.explore}
    },
    dispatch => bindActionCreators({
        ...actionCreators.explore,
    }, dispatch),
)
class Explore extends React.Component {

    componentDidMount() {
        this.props.fetchLocations();
        this.props.setPageLinks([
            {
                to: `/explore/past`,
                label: 'Travels History'
            },
            {
                to: `/explore/current`,
                label: 'Traveling Now'
            },
            {
                to: `/explore/future`,
                label: 'Future Travels'
            }
        ])
    }

    componentWillUnmount () {
        this.props.setPageLinks(null);
        this.props.selectPopularCity && this.props.selectPopularCity(null);
    }

    onDestinationSelected (cityAndCountry) {
        this.props.selectPopularCity && this.props.selectPopularCity(this.props.selectedPopularCity == cityAndCountry ? null : cityAndCountry);
    }

    render() {
        let locations = (this.props.friendsLocations || []).map(fl => ({place: fl.place, location: fl.location, icon: fl.user.photo, title: fl.title, label: fl.label })),
            byCity = {};

        if (this.props.selectedPopularCity) {
            locations = locations.filter(l => {
                return (l.place.location.city + ', ' + l.place.location.country) ==  this.props.selectedPopularCity;
            })
        }
        this.props.friendsLocations.forEach(l => {
            let currentCity = byCity[l.place.location.city + ', ' + l.place.location.country];
            if (currentCity == null) {
                currentCity = byCity[l.place.location.city + ', ' + l.place.location.country] = {city: l.place.location.city, country: l.place.location.country,  visits: []};
            }

            currentCity.visits.push(l);
        });

        return (
            <div className="explore-page">
                <div className="content">
                    <div className="left-panel">
                        <ResizeablePanel title={"Popular Destinations"} className="visited-cities-list">
                            {Object.keys(byCity).map( cityAndCountry => {
                                return (
                                    <VisitedCityListItem
                                        className={this.props.selectedPopularCity == cityAndCountry ? 'selected' : ''}
                                        onSelected={this.onDestinationSelected.bind(this, cityAndCountry)}
                                        city = {byCity[cityAndCountry].city}
                                        country = {byCity[cityAndCountry].country}
                                        visits={byCity[cityAndCountry].visits}/>
                                );
                            })}
                        </ResizeablePanel>
                    </div>
                    <MapView heatmap={this.props.selectedPopularCity == null} locations={locations} />
                </div>
            </div>
        )
    }
}

export default Explore;