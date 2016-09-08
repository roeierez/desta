import React from 'react';
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
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

    render() {
        let {byCountry, onSelect, selectedValue} = this.props;
        return(
            <SelectableList style={styles.list} value={JSON.stringify(selectedValue)} defaultValue={3} onChange = {this.onChange.bind(this)}>
                <Subheader>Friends Locations</Subheader>
                {
                    Object.keys(byCountry).map(country => {
                        let visits = this.getUniqVisits(byCountry[country].visits).length,
                            countryCode = countryNameToCode[country.toLowerCase()];
                        return (
                            <ListItem
                                value={JSON.stringify({country})}
                                primaryText={<div className="list-item"><div className="left"><span className={`flag-icon flag-icon-${countryCode}`} />{country}</div><div className="right">{`${visits} Friends`}</div></div>}
                                nestedItems = {
                                    Object.keys(byCountry[country].cities).map(city => {
                                        let cityVisits = this.getUniqVisits(byCountry[country].cities[city].visits).length;
                                            return <ListItem value={JSON.stringify({country,city})}
                                                             primaryText={<div className="list-item"><div className="left">{city}</div><div className="right">{`${cityVisits} Friends`}</div></div>}
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