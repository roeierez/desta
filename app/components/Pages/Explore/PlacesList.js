import React from 'react';
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';

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
                        let visits = byCountry[country].visits.length;
                        return (
                            <ListItem
                                value={JSON.stringify({country})}
                                primaryText={<div className="list-item"><div className="left">{country}</div><div className="right">{`${visits} Friends`}</div></div>}
                                nestedItems = {
                                    Object.keys(byCountry[country].cities).map(city => {
                                        let cityVisits = byCountry[country].cities[city].visits.length;
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
}

export default PlacesList;