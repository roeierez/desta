import React,{PropTypes} from 'react';
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import {parseShortDate} from 'lib/dateUtils';
import {getCityImage} from 'lib/tripUtils';

    
class DestinationsList extends React.Component {

    static propTypes = {
        destinations: PropTypes.arrayOf(PropTypes.Object).required,
        onDestinationSelected: PropTypes.func
    }

    render() {
        let {destinations, onDestinationSelected} = this.props;

        return (
            <List>
                {
                    destinations.map(d => {
                        let startDate = parseShortDate(d.tripDates.startDate),
                            endDate = parseShortDate(d.tripDates.endDate);
                        return (
                            <ListItem
                                primaryText={d.tripDestination.cityName}
                                leftAvatar={<Avatar src={getCityImage(d.tripDestination.cityName)} />}
                                secondaryText={startDate.format('MMMM DD') + ' - ' + endDate.format('MMMM DD')}
                                rightIcon={<FontIcon onTouchTap={() => onDestinationSelected(d)}  className="material-icons">edit</FontIcon>}
                            />
                        )
                    })
                }
            </List>
        );    
    }
}

export default DestinationsList;