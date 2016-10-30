import React from 'react';
import MapView from 'components/Modules/MapView'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from 'redux-modules';
import ResizeablePanel from 'components/Modules/ResizeablePanel';
import PlacesList from './PlacesList';
import DatePicker from 'material-ui/DatePicker';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FontIcon from 'material-ui/FontIcon';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import {blue500, red500, greenA200, pink500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import moment from 'moment';
import {formatPhotoURL} from 'lib/facebook';
import {findDestinationCountry} from 'lib/tripUtils';
import PeopleVisitsList from './PeopleVisitsList';
import ListNavigationHeader from './ListNavigationHeader'
import Avatar from 'components/Modules/Avatar';
import {Tabs, Tab} from 'material-ui/Tabs';
import {cyan300} from 'material-ui/styles/colors';
import {browserHistory} from 'react-router';
import MonthPicker from 'components/Modules/MonthPicker'

const styles = {
    tab: {position: 'relative', height: '35px'},
    tabLabel: {position: 'absolute', height: '35px', top: '9px'}
}

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

    onSelectedMonthChange(year, month) {
        this.props.setFromDate(new Date(year, month, 1));
        this.props.setToDate(new Date(year, month + 1, 0));
    }

    setPastFilter() {
        this.props.setToDate(new Date());
        this.props.setFromDate(moment(new Date()).subtract(10, 'years').toDate());
    }

    handleTabSelected(tab){
       // browserHistory.push(`/explore/${tab}`)
        if (tab == 'future') {
            this.setFutureFilter();
        } else if (tab == 'present') {
            this.setLastMonthFilter();
        } else {
            this.setPastFilter();
        }
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
                let country = findDestinationCountry(destination.tripDestination);
                if (country) {
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
                }
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

        let exploreContent = (
            <ExploreContent
                cityToShow={cityToShow}
                byCountry={byCountry}
                onDestinationSelected={this.onDestinationSelected.bind(this)}
                selectedValue={selectedValue}
                selectedPopularCity={this.props.selectPopularCity}
                setCityToShow={this.props.setCityToShow}
                visitToShow={visitToShow}
                onVisitSelected={this.onVisitSelected.bind(this)}
                shownCityVisits={shownCityVisits}
                mapIcons={mapIcons}
                fromDate={fromDate}
                toDate={toDate}
                onSelectedMonthChange={this.onSelectedMonthChange.bind(this)}
                backFromPeople={this.backFromPeople.bind(this)}
            />
        );


        return (
            <div className="explore-page">
                {
                    // <Toolbar style={{marginBottom: "20px"}}>
                    //     <ToolbarGroup firstChild={true}>
                    //         <DatePicker
                    //             onChange={this.onFromDateChanged.bind(this)}
                    //             className="date-picker"
                    //             hintText="From Date"
                    //             value={fromDate.toDate()}
                    //             autoOk={true}
                    //         />
                    //         <span style={{textAlign: 'center', lineHeight: '55px'}}>-</span>
                    //         <DatePicker
                    //             onChange={this.onToDateChanged.bind(this)}
                    //             className="date-picker"
                    //             hintText="To Date"
                    //             value={toDate.toDate()}
                    //             autoOk={true}
                    //         />
                    //         <ToolbarSeparator />
                    //         <FlatButton onTouchTap={this.setLastWeekFilter.bind(this)} label="Last Week"
                    //                     primary={true}/>
                    //         <FlatButton onTouchTap={this.setLastMonthFilter.bind(this)} label="Last Month"
                    //                     primary={true}/>
                    //         <FlatButton onTouchTap={this.setFutureFilter.bind(this)} label="Future Travels"
                    //                     secondary={true}/>
                    //     </ToolbarGroup>
                    //     <ToolbarGroup>
                    //
                    //     </ToolbarGroup>
                    // </Toolbar>
                }
                <div className="time-tabs">
                    <Tabs onChange={this.handleTabSelected.bind(this)} inkBarStyle={{backgroundColor: cyan300}} style={{height: '35px'}} tabItemContainerStyle={{height: "35px", borderTopRightRadius: "5px", borderTopLeftRadius: "5px"}}>
                        <Tab value="past" style={styles.tab} label={<div style={styles.tabLabel}>Past</div>}>

                        </Tab>
                        <Tab value="present" style={styles.tab} label={<div style={styles.tabLabel}>Present</div>}>

                        </Tab>
                        <Tab value="future" style={styles.tab} label={<div style={styles.tabLabel}>Future</div>}>

                        </Tab>
                    </Tabs>
                </div>
                {exploreContent}
            </div>
        )
    }

    backFromPeople(){
        this.props.setCityToShow(null);
        this.props.selectVisitToShow(null);
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
}

class ExploreContent extends React.Component {

    render() {
        let {fromDate, toDate, onSelectedMonthChange, byCountry, cityToShow, onDestinationSelected, selectedValue, selectedPopularCity, setCityToShow, visitToShow, onVisitSelected, shownCityVisits, mapIcons, backFromPeople} = this.props,
            fromMonth = fromDate.month(),
            fromYear = fromDate.year(),
            toMonth = toDate.month(),
            toYear = toDate.year();

        let value = (fromMonth == toMonth && fromYear == toYear) ? {month: fromMonth, year: fromYear} : "WWW"
        return (
            <div className="content">
                <div className="left-panel">
                    <div className="edit">
                        <MonthPicker onChange={onSelectedMonthChange} value={value} />
                    </div>
                    {!cityToShow && (
                        <PlacesList header={<ListNavigationHeader onRightLinkClick={() => {onDestinationSelected({country: null});}} rightLink="ALL" title="FRIENDS LOCATIONS" />} selectedValue={selectedValue} selectedPopularCity={selectedPopularCity} onViewCity={setCityToShow} onSelect={onDestinationSelected.bind(this)}
                                    byCountry={byCountry}/>
                    )}
                    {cityToShow && (
                        <PeopleVisitsList header={<ListNavigationHeader onBack={backFromPeople.bind(this)} title={`${cityToShow.city.toUpperCase()}, ${cityToShow.country.toUpperCase()}`} backTitle="All" />} selectedPerson={visitToShow} onSelect={onVisitSelected.bind(this)}
                                          visits={shownCityVisits}/>
                    )}
                </div>
                <MapView heatmap={selectedPopularCity == null && this.props.params.filter == 'past'}
                         locations={mapIcons}/>
            </div>
        )
    }
}

export default Explore;