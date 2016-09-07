import React from 'react';
import MapView from 'components/Modules/MapView'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from 'redux-modules';
import VisitedCityListItem from './VisitedCityListItem';
import PersonVisitListItem from './PersonVisitListItem';
import ResizeablePanel from 'components/Modules/ResizeablePanel';
import { browserHistory } from 'react-router';
import PlacesList from './PlacesList';
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

    onDestinationSelected (place) {
        this.props.selectCountry(place.country);
        if (place.city) {
            this.props.selectPopularCity && this.props.selectPopularCity(this.props.selectedPopularCity == place.city ? null : place.city);
        } else {
            this.props.selectPopularCity(null);
        }
    }

    onPersonSelected(userId) {
        this.props.selectTravelingFriend && this.props.selectTravelingFriend(userId == this.props.selectedTravelingFriend ? null : userId);
    }

    render() {
        let locations = (this.props.friendsLocations || []).map(fl => ({created_time: fl.created_time, user: fl.user, place: fl.place, location: fl.location, icon: fl.user.photo, title: fl.title, label: fl.label })),
            selectedCountry = this.props.selectedCountry,
            selectedPopularCity = this.props.selectedPopularCity,
            byCity = {},
            byCountry = {},
            allVisits = [];


        locations.forEach(l => {
            let location = l.place.location,
                currentCountry = byCountry[location.country];

            if (!currentCountry) {
                currentCountry = byCountry[location.country] = {
                    label: location.country,
                    id: location.country,
                    cities: {},
                    visits: []
                }
            }

            currentCountry.visits.push(l);
            let currentCity = currentCountry.cities[location.city];
            if (!currentCity) {
                currentCity = currentCountry.cities[location.city] = {
                    label: location.city,
                    city: location.city,
                    id: location.country + ', ' + location.city,
                    visits: []
                }
            }

            currentCity.visits.push(l);

            currentCity.visits.push(l);
            //let currentCity = byCity[l.place.location.city + ', ' + l.place.location.country];
            // if (currentCity == null) {
            //     currentCity = byCity[l.place.location.city + ', ' + l.place.location.country] = {city: l.place.location.city, country: l.place.location.country,  visits: []};
            // }
            // ;
            // allVisits.push(l);
        });

        {/*if (this.props.params.filter == 'current') {*/}
            {/*allVisits = allVisits.filter(v => {*/}
                {/*return moment().diff(moment(v.created_time), 'days') < 7;*/}
            {/*})*/}
            {/*allVisits.sort((v1, v2) => {*/}
                {/*return moment(v1.created_time).diff(moment(v2), 'seconds');*/}
            {/*});*/}

            {/*allVisits = this.getUniqLastWeekVisits(allVisits);*/}
            {/*locations = allVisits;*/}
        {/*}*/}

        {/*if (this.props.selectedPopularCity && this.props.params.filter == 'past') {*/}
            {/*locations = locations.filter(l => {*/}
                {/*return (l.place.location.city + ', ' + l.place.location.country) ==  this.props.selectedPopularCity;*/}
        //     })
        // }
        //
        // if (this.props.selectedTravelingFriend && this.props.params.filter == 'current') {
        //     locations = locations.filter(l => {
        //         return l.user.id ==  this.props.selectedTravelingFriend;
        //     })
        // }

        var selectedValue = {};
        if (selectedCountry) {
            selectedValue.country = selectedCountry;
        }
        if (selectedPopularCity) {
            selectedValue.city = selectedPopularCity;
        }
        return (
            <div className="explore-page">
                <div className="content">
                    <div className="left-panel">
                        <PlacesList selectedValue={selectedValue} onSelect={this.onDestinationSelected.bind(this)} byCountry={byCountry} />
                    </div>
                    <MapView heatmap={this.props.selectedPopularCity == null && this.props.params.filter == 'past'} locations={locations} />
                </div>
            </div>
        )
    }

    renderVisits(byCountry, country) {
        var placesObject = country && byCountry[country] ? byCountry[country].cities : byCountry,
            places = Object.keys(placesObject).map(k => placesObject[k]);

        let visitedPlaces = places.map( place => {
            return {
                label: place.label,
                visits: place.visits,
                city: place.city,
                className: place.city && this.props.selectedPopularCity == place.city ? 'selected' : '',
                onSelected: this.onDestinationSelected.bind(this, place)
            }
        });

        return (
            <ResizeablePanel title={byCountry[country] && country || "All Countries"} className="visited-cities-list">
                {visitedPlaces.map( visit => {
                    return (
                        <VisitedCityListItem {...visit} />
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