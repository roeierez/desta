import React from 'react';
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import Avatar from 'components/Modules/Avatar';
import Subheader from 'material-ui/Subheader';
import {formatShortDate} from 'lib/dateUtils';
import moment from 'moment';

let SelectableList = MakeSelectable(List),
    styles = {
        list: {
            border: "1px solid rgb(217, 217, 217)",
            backgroundColor: "white"
        }
    }

class PeopleVisitsList extends React.Component {

    onChange(event, value) {
        this.props.onSelect(value && JSON.parse(value));
    }

    render() {
        let {header, visits, onSelect, selectedPerson} = this.props,
            PersonListItem = ({visit}) => (
                <div className="person-visit">
                    <Avatar id={visit.user.id} width="30" height="30" textStyle={{ fontWeight:'normal', marginLeft: "15px", fontSize: "14px"}} name={visit.user.name}/>
                    <div className="visit-date">{moment(visit.arrivalTime).format('ll')}</div>
                </div>
            )

        visits = visits.sort((v1, v2) => {
            if( v1.arrivalTime.isSame(v2.arrivaltime)) {
                return 0;
            } else if (v1.arrivalTime.isBefore(v2.arrivaltime)) {
                return -1;
            }

            return 1;
        })
        return (
            <SelectableList style={styles.list} value={JSON.stringify(selectedPerson)} onChange = {this.onChange.bind(this)}>
                <Subheader>{header}</Subheader>
                {
                    visits.map(visit => {
                        return (
                            <ListItem
                                value={JSON.stringify(visit)}
                                primaryText={<PersonListItem visit={visit} />}
                            />

                        )
                    })
                }
            </SelectableList>
        )
    }
}

export default PeopleVisitsList;
