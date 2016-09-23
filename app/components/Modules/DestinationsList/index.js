import React,{PropTypes} from 'react';
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import {parseShortDate} from 'lib/dateUtils';
import {getCityImage} from 'lib/tripUtils';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

    
class DestinationsList extends React.Component {

    static propTypes = {
        destinations: PropTypes.arrayOf(PropTypes.Object).required,
        onDestinationSelected: PropTypes.func
    }

    render() {
        let {destinations, onDestinationSelected} = this.props;

        const iconButtonElement = (
            <IconButton
                touch={true}>
                <MoreVertIcon color={grey400} />
            </IconButton>
        );

        const RightIconMenu = ({destination}) =>  (
            <IconMenu iconButtonElement={iconButtonElement}>
                <MenuItem onTouchTap={() => onDestinationSelected(destination)}>Edit</MenuItem>
                <MenuItem>Delete</MenuItem>
            </IconMenu>
        );

        let listItems = [];
        destinations.forEach(d => {
            let startDate = parseShortDate(d.tripDates.startDate),
                endDate = parseShortDate(d.tripDates.endDate);
            listItems.push((
                <ListItem
                    rightIcon={
                        <IconMenu style={{transform: "translateY(-18px)", paddingRight: "12px"}} iconButtonElement={iconButtonElement}>
                            <MenuItem onTouchTap={() => onDestinationSelected(d)}>Edit</MenuItem>
                            <MenuItem>Delete</MenuItem>
                        </IconMenu>
                    }
                    primaryText={d.tripDestination.cityName}
                    leftAvatar={<Avatar src={getCityImage(d.tripDestination.cityName)} />}
                    secondaryText={startDate.format('MMM DD') + ' - ' + endDate.format('MMM DD')}
                />
            ));
        });
        return (
            <List>
                {
                    listItems
                }
            </List>
        );    
    }
}

export default DestinationsList;