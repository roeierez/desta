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
import FlatButton from 'material-ui/FlatButton';
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

    onFromDateChanged (e, date) {
        this.props.setFromDate(date);
    }

    onToDateChanged (e, date) {
        this.props.setToDate(date);
    }

    setLastWeekFilter () {
        this.props.setToDate(new Date());
        this.props.setFromDate(moment(new Date()).subtract(7, 'days').toDate());
    }

    setLastMonthFilter () {
        this.props.setToDate(new Date());
        this.props.setFromDate(moment(new Date()).subtract(1, 'months').toDate());
    }

    setFutureFilter () {
        this.props.setFromDate(new Date());
        this.props.setToDate(moment(new Date()).add(10, 'years').toDate());
    }

    render() {
        let locations = (this.props.friendsLocations || []).map(fl => ({created_time: fl.created_time, user: fl.user, place: fl.place, location: fl.location, icon: fl.user.photo, title: fl.title, label: fl.label })),
            selectedCountry = this.props.selectedCountry,
            selectedPopularCity = this.props.selectedPopularCity,
            {fromDate, toDate} = this.props,
            byCountry = {};

        fromDate = moment(fromDate);
        toDate = moment(toDate);

        locations = locations.filter(l => {
            let createdTime = moment(l.created_time);
            if (fromDate.isAfter(createdTime) || toDate.isBefore(moment(l.created_time))) {
                return;
            }

            return true;
        });

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
        });

        var selectedValue = {};
        if (selectedCountry) {
            selectedValue.country = selectedCountry;
        }
        if (selectedPopularCity) {
            selectedValue.city = selectedPopularCity;
        }

        locations = locations.filter(l => {
            if (selectedCountry && l.place.location.country != selectedCountry) {
                return false;
            }

            if (selectedPopularCity && l.place.location.city != selectedPopularCity) {
                return false;
            }
            return true;
        });

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
                            <span style={{textAlign:'center', lineHeight:'55px'}}>-</span>
                            <DatePicker
                                onChange={this.onToDateChanged.bind(this)}
                                className="date-picker"
                                hintText="To Date"
                                value={toDate.toDate()}
                                autoOk={true}
                            />
                            <ToolbarSeparator />
                            <FlatButton onTouchTap={this.setLastWeekFilter.bind(this)} label="Last Week" primary={true} />
                            <FlatButton onTouchTap={this.setLastMonthFilter.bind(this)} label="Last Month" primary={true} />
                            <FlatButton onTouchTap={this.setFutureFilter.bind(this)} label="Future Travels" secondary={true} />
                        </ToolbarGroup>
                        <ToolbarGroup>

                        </ToolbarGroup>
                    </Toolbar>
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
                visits: this.getUniqVisits(place.visits),
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