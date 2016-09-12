import React from 'react';
import MapView from 'components/Modules/MapView'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from 'redux-modules';
import VisitedCityListItem from './VisitedCityListItem';
import PersonVisitListItem from './PersonVisitListItem';
import ResizeablePanel from 'components/Modules/ResizeablePanel';
import PlacesList from './PlacesList';
import DatePicker from 'material-ui/DatePicker';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FontIcon from 'material-ui/FontIcon';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import moment from 'moment';
import {formatPhotoURL} from 'lib/facebook';
import {findDestinationCountry} from 'lib/tripUtils';
import PeopleVisitsList from './PeopleVisitsList';
import ListNavigationHeader from './ListNavigationHeader'
import Avatar from 'components/Modules/Avatar';

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
        this.props.login().payload.promise.then(() => {
            this.props.fetchFriendsTrips();
            this.props.fetchLocations();
        })
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

    componentWillUnmount() {
        this.props.setPageLinks(null);
        this.props.selectPopularCity && this.props.selectPopularCity(null);
    }

    onDestinationSelected(place) {
        this.props.selectCountry(place.country);
        this.props.selectVisitToShow(null);
        if (place.city) {
            this.props.selectPopularCity && this.props.selectPopularCity(this.props.selectedPopularCity == place.city ? null : place.city);
        } else {
            this.props.selectPopularCity(null);
        }
    }

    onVisitSelected(visit) {
        this.props.selectVisitToShow(visit);
    }

    onPersonSelected(userId) {
        this.props.selectTravelingFriend && this.props.selectTravelingFriend(userId == this.props.selectedTravelingFriend ? null : userId);
    }

    onFromDateChanged(e, date) {
        this.props.setFromDate(date);
    }

    onToDateChanged(e, date) {
        this.props.setToDate(date);
    }

    setLastWeekFilter() {
        this.props.setToDate(new Date());
        this.props.setFromDate(moment(new Date()).subtract(7, 'days').toDate());
    }

    setLastMonthFilter() {
        this.props.setToDate(new Date());
        this.props.setFromDate(moment(new Date()).subtract(1, 'months').toDate());
    }

    setFutureFilter() {
        this.props.setFromDate(new Date());
        this.props.setToDate(moment(new Date()).add(10, 'years').toDate());
    }

    render() {
        let locations = (this.props.friendsLocations || []).map(fl => ({
                arrivalTime: moment(fl.created_time),
                leaveTime: moment(fl.created_time),
                user: fl.user,
                country: fl.place.location.country,
                city: fl.place.location.city,
                location: fl.location,
                icon: fl.user.photo
            })),
            {fromDate, toDate, selectedCountry, selectedPopularCity, cityToShow, visitToShow} = this.props,
            byCountry = {};


        fromDate = moment(fromDate);
        toDate = moment(toDate);

        this.props.friendsTrips.forEach(trip => {
            trip.destinations.forEach(destination => {
                let location = {
                    arrivalTime: moment(destination.tripDates.startDate),
                    leaveTime: moment(destination.tripDates.endDate),
                    user: {id: trip.owner.facebookID, name: trip.owner.name},
                    country: destination.tripDestination.country || findDestinationCountry(destination.tripDestination),
                    city: destination.tripDestination.cityName,
                    location: destination.tripDestination.location,
                    icon: formatPhotoURL(trip.owner.facebookID, 45),
                    trip: trip
                };

                locations.push(location);
            })
        });

        locations = locations.filter(l => {
            let createdTime = moment(l.time);
            if (fromDate.isAfter(l.leaveTime) || toDate.isBefore(moment(l.arrivalTime))) {
                return;
            }

            return true;
        });

        locations.forEach(l => {

            let currentCountry = byCountry[l.country];

            if (!currentCountry) {
                currentCountry = byCountry[l.country] = {
                    label: l.country,
                    id: l.country,
                    cities: {},
                    visits: []
                }
            }

            currentCountry.visits.push(l);
            let currentCity = currentCountry.cities[l.city];
            if (!currentCity) {
                currentCity = currentCountry.cities[l.city] = {
                    label: l.city,
                    city: l.city,
                    id: l.country + ', ' + l.city,
                    visits: []
                }
            }

            currentCity.visits.push(l);
        });

        var selectedValue = {};
        if (selectedCountry) {
            selectedValue.country = selectedCountry;
        }
        if (selectedPopularCity) {
            selectedValue.city = selectedPopularCity;
        }

        locations = locations.filter(l => {
            if (selectedCountry && l.country != selectedCountry) {
                return false;
            }

            if (selectedPopularCity && l.city != selectedPopularCity) {
                return false;
            }

            if (visitToShow && (JSON.stringify(l) != JSON.stringify(visitToShow))) {
                return false;
            }

            return true;
        });

        let mapIcons = locations.map(l => {
            // return {
            //     location: l.location,
            //     component: <Avatar id={l.user.id} />
            // }
            return l;
        });
        let shownCountry = cityToShow && byCountry[cityToShow.country],
            shownCity = shownCountry && shownCountry.cities[cityToShow.city],
            shownCityVisits = shownCity && shownCity.visits || [];

        return (
            <div className="explore-page">
                <Toolbar style={{marginBottom: "20px"}}>
                    <ToolbarGroup firstChild={true}>
                        <DatePicker
                            onChange={this.onFromDateChanged.bind(this)}
                            className="date-picker"
                            hintText="From Date"
                            value={fromDate.toDate()}
                            autoOk={true}
                        />
                        <span style={{textAlign: 'center', lineHeight: '55px'}}>-</span>
                        <DatePicker
                            onChange={this.onToDateChanged.bind(this)}
                            className="date-picker"
                            hintText="To Date"
                            value={toDate.toDate()}
                            autoOk={true}
                        />
                        <ToolbarSeparator />
                        <FlatButton onTouchTap={this.setLastWeekFilter.bind(this)} label="Last Week" primary={true}/>
                        <FlatButton onTouchTap={this.setLastMonthFilter.bind(this)} label="Last Month" primary={true}/>
                        <FlatButton onTouchTap={this.setFutureFilter.bind(this)} label="Future Travels"
                                    secondary={true}/>
                    </ToolbarGroup>
                    <ToolbarGroup>

                    </ToolbarGroup>
                </Toolbar>
                <div className="content">
                    <div className="left-panel">
                        {!cityToShow && (
                            <PlacesList header={<ListNavigationHeader title="FRIENDS LOCATIONS" />} selectedValue={selectedValue} selectedPopularCity={selectedPopularCity} onViewCity={this.props.setCityToShow} onSelect={this.onDestinationSelected.bind(this)}
                                        byCountry={byCountry}/>
                        )}
                        {cityToShow && (
                            <PeopleVisitsList header={<ListNavigationHeader onBack={this.backFromPeople.bind(this)} title={`${cityToShow.city.toUpperCase()}, ${cityToShow.country.toUpperCase()}`} backTitle="All Cities" />} selectedPerson={visitToShow} onSelect={this.onVisitSelected.bind(this)}
                                        visits={shownCityVisits}/>
                        )}
                    </div>
                    <MapView heatmap={this.props.selectedPopularCity == null && this.props.params.filter == 'past'}
                             locations={mapIcons}/>
                </div>
            </div>
        )
    }

    backFromPeople(){
        this.props.setCityToShow(null);
        this.props.selectVisitToShow(null);
    }

    renderVisits(byCountry, country) {
        var placesObject = country && byCountry[country] ? byCountry[country].cities : byCountry,
            places = Object.keys(placesObject).map(k => placesObject[k]);

        let visitedPlaces = places.map(place => {
            return {
                label: place.label,
                visits: this.getUniqVisits(place.visits),
                city: place.city,
                className: place.city && this.props.selectedPopularCity == place.city ? 'selected' : '',
                onSelected: this.onDestinationSelected.bind(this, place)
            }
        });

        return (
            <ResizeablePanel title={byCountry[country] && country || "All Countries"} className="visited-cities-list">
                {visitedPlaces.map(visit => {
                    return (
                        <VisitedCityListItem {...visit} />
                    );
                })}
            </ResizeablePanel>
        )
    }

    getUniqVisits(visits) {
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
                {visits.map(visit => {
                    return (
                        <PersonVisitListItem
                            className={this.props.selectedTravelingFriend == visit.user.id ? 'selected' : ''}
                            onSelected={this.onPersonSelected.bind(this, visit.user.id)}
                            city={visit.place.location.city}
                            country={visit.place.location.country}
                            visit={visit}/>
                    );
                })}
            </ResizeablePanel>
        )
    }
}

export default Explore;