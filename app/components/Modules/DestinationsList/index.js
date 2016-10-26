import React,{PropTypes} from 'react';
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import {parseShortDate} from 'lib/dateUtils';
import {getDestinationImage} from 'lib/tripUtils';
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

    onListitemTap(d, e) {
        this.props.onDestinationSelected(d);
    }

    render() {
        let {destinations, onDestinationSelected, onDeleteDestination} = this.props;

        const iconButtonElement = (
            <IconButton
                touch={true}>
                <MoreVertIcon color={grey400} />
            </IconButton>
        );

        const RightIconMenu = ({destination}) =>  (
            <IconMenu iconButtonElement={iconButtonElement}>
                <MenuItem onTouchTap={(e) => {e.stopPropagation(); onDestinationSelected(destination);}}>Edit</MenuItem>
                <MenuItem>Delete</MenuItem>
            </IconMenu>
        );

        let listItems = [];
        destinations.forEach(d => {
            let startDate = parseShortDate(d.tripDates.startDate),
                endDate = parseShortDate(d.tripDates.endDate);
            listItems.push((
                <ListItem
                    style={{
                        //fontSize: "11px"
                    }}
                    innerDivStyle={{
                        //padding: "6px 56px 0px 72px"
                    }}
                    rightIcon={
                        <IconMenu style={{transform: "translateY(-18px)", paddingRight: "12px"}} iconButtonElement={iconButtonElement}>
                            <MenuItem onTouchTap={() => onDestinationSelected(d)}>Edit</MenuItem>
                            {destinations.length > 1 && <MenuItem onTouchTap={() => onDeleteDestination(d)}>Delete</MenuItem>}
                        </IconMenu>
                    }
                    primaryText={<span onClick={this.onListitemTap.bind(this, d)}>{d.tripDestination.cityName}</span>}
                    leftAvatar={<Avatar src={getDestinationImage(d.tripDestination)} />}
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