import React from 'react';
import MapView from 'components/Modules/MapView'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from 'redux-modules';
import VisitedCityListItem from './VisitedCityListItem';
import PersonVisitListItem from './PersonVisitListItem';
import ResizeablePanel from 'components/Modules/ResizeablePanel';
import moment from 'moment';

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

    onPersonSelected(userId) {
        this.props.selectTravelingFriend && this.props.selectTravelingFriend(userId == this.props.selectedTravelingFriend ? null : userId);
    }

    render() {
        let locations = (this.props.friendsLocations || []).map(fl => ({created_time: fl.created_time, user: fl.user, place: fl.place, location: fl.location, icon: fl.user.photo, title: fl.title, label: fl.label })),
            byCity = {},
            allVisits = [];


        locations.forEach(l => {
            let currentCity = byCity[l.place.location.city + ', ' + l.place.location.country];
            if (currentCity == null) {
                currentCity = byCity[l.place.location.city + ', ' + l.place.location.country] = {city: l.place.location.city, country: l.place.location.country,  visits: []};
            }

            currentCity.visits.push(l);
            allVisits.push(l);
        });

        if (this.props.params.filter == 'current') {
            allVisits = allVisits.filter(v => {
                return moment().diff(moment(v.created_time), 'days') < 7;
            })
            allVisits.sort((v1, v2) => {
                return moment(v1.created_time).diff(moment(v2), 'seconds');
            });

            allVisits = this.getUniqLastWeekVisits(allVisits);
            locations = allVisits;
        }

        if (this.props.selectedPopularCity && this.props.params.filter == 'past') {
            locations = locations.filter(l => {
                return (l.place.location.city + ', ' + l.place.location.country) ==  this.props.selectedPopularCity;
            })
        }

        if (this.props.selectedTravelingFriend && this.props.params.filter == 'current') {
            locations = locations.filter(l => {
                return l.user.id ==  this.props.selectedTravelingFriend;
            })
        }

        return (
            <div className="explore-page">
                <div className="content">
                    <div className="left-panel">
                        {this.props.params.filter == "past" && this.renderByVityVisitsList(byCity)}
                        {this.props.params.filter == "current" && this.renderPeopleVisitsList(allVisits)}
                    </div>
                    <MapView heatmap={this.props.selectedPopularCity == null && this.props.params.filter == 'past'} locations={locations} />
                </div>
            </div>
        )
    }

    renderByVityVisitsList(byCity) {
        return (
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
        )
    }

    getUniqLastWeekVisits(visits) {
        let uniqVisits = {};
        visits.forEach(v => {
            uniqVisits[v.user.id] = v;
        });
        return Object.keys(uniqVisits).map(userId => {
            return uniqVisits[userId];
        });
    }

    renderPeopleVisitsList(visits) {
        return (
            <ResizeablePanel title={"Friends Travelling"} className="person-visits-list">
                {visits.map( visit => {
                    return (
                        <PersonVisitListItem
                            className={this.props.selectedTravelingFriend == visit.user.id ? 'selected' : ''}
                            onSelected={this.onPersonSelected.bind(this, visit.user.id)}
                            city = {visit.place.location.city}
                            country = {visit.place.location.country}
                            visit={visit}/>
                    );
                })}
            </ResizeablePanel>
        )
    }
}

export default Explore;