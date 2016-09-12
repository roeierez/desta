import React from 'react';
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import countryNameToCode from 'lib/countryCodes';

let SelectableList = MakeSelectable(List),
    styles = {
        list: {
            border: "1px solid rgb(217, 217, 217)",
            backgroundColor: "white"
        },
        subheader: {
            fontSize: "16px"
        }
    }

class PlacesList extends React.Component {

    onChange(event, value) {
        this.props.onSelect(value && JSON.parse(value));
    }

    onViewCity(event, country, city) {
        event.preventDefault();
        this.props.onViewCity({country, city});
    }

    render() {
        let {byCountry, onSelect, selectedValue, header} = this.props,
            CountryListItem = ({country, countryCode, visits}) =>  (
                <div className="list-item">
                    <div className="left">
                        <span className={`flag-icon flag-icon-${countryCode}`} />{country}
                    </div>
                    <div className="right">
                        <div className="visits">{`${visits} Friends`}</div>
                    </div>
                </div>
            ),
            CityListItem = ({country, city, cityVisits, selected}) => (
                <div className="list-item">
                    <div className="left">{city}</div>
                    <div className="right">
                        <div className="visits">{`${cityVisits} Friends`}</div>
                        {selected && (<span className="view-people" onClick={(e) => this.onViewCity(e, country, city)}>View</span>)}
                    </div>
                </div>
            );
        return(
            <SelectableList style={styles.list} value={JSON.stringify(selectedValue)} defaultValue={3} onChange = {this.onChange.bind(this)}>
                <Subheader>{header}</Subheader>
                {
                    Object.keys(byCountry).map(country => {
                        let visits = this.getUniqVisits(byCountry[country].visits).length,
                            countryCode = countryNameToCode[country.toLowerCase()];
                        return (
                            <ListItem
                                value={JSON.stringify({country})}
                                primaryText={<CountryListItem country={country} countryCode={countryCode} visits={visits} />}
                                nestedItems = {
                                    Object.keys(byCountry[country].cities).map(city => {
                                        let cityVisits = this.getUniqVisits(byCountry[country].cities[city].visits).length;
                                            return <ListItem value={JSON.stringify({country,city})}
                                                             primaryText={<CityListItem country={country} city={city} cityVisits={cityVisits} selected={ this.props.selectedPopularCity == city}/>}
                                            />
                                        }
                                    )
                                }
                            />

                        )
                    })
                }
            </SelectableList>
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
}

export default PlacesList;