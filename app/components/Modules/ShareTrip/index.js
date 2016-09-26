import React, {PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import {grey700, cyan400, lightBlue400, lightGreen400, red400, indigo400} from 'material-ui/styles/colors';
import {formatTitleAndSubtitle, getCityImage} from 'lib/tripUtils';
import Avatar from 'material-ui/Avatar';
import {ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';

const styles={};

class ShareTrip extends React.Component {

    handleClose() {
        this.props.onRequestClose();
    }

    handleShare(audience) {
        this.props.shareTrip(this.props.trip, audience);
    }

    render() {

        let {trip, open, generateTripLink, removeTripLink} = this.props,
            {title, subtitle} = formatTitleAndSubtitle(trip),
            sharedWith = trip.shareAudience || 'public',
            VI = (color) => <FontIcon color={color} className="material-icons">check_circle</FontIcon>;

        return (
            <Dialog
                autoScrollBodyContent={true}
                titleStyle={{marginRight: "40px", marginLeft: "38px", padding: "12px 0px 12px 0px", borderColor: cyan400, borderBottom: "2px solid", color: grey700}}
                    modal={false}
                         title= {<div>Share Trip <FontIcon onTouchTap={() => this.handleClose()} style={{cursor: 'pointer', float: 'right', right: "-30px", top: "5px"}} className="material-icons">close</FontIcon></div>}
                    contentStyle={{maxWidth: "550px"}}
                    open={open}
                    onRequestClose={this.handleClose.bind(this)}>
                <ListItem
                    disabled={true}
                    primaryText={title}
                    leftAvatar={<Avatar style={{borderRadius:"5px"}} src={getCityImage(trip.destinations[0].tripDestination.cityName)} />}
                    secondaryText={subtitle}
                />
                <ListItem
                    style={{marginBottom: "10px"}}
                    rightIcon={
                        trip.link ?
                            <FontIcon onTouchTap={(e) => {e.preventDefault(); e.stopPropagation(); removeTripLink(trip);}} color={red400} className="material-icons">delete</FontIcon> :
                            <FontIcon onTouchTap={(e) => {e.preventDefault(); e.stopPropagation(); generateTripLink(trip);}} color={indigo400} className="material-icons">refresh</FontIcon>
                    }
                    secondaryText={trip.link != null && <a style={{display:"inline-block", overflow:"hidden", width: "300px", textOverflow: 'ellipsis', color: indigo400}} href={trip.link}>{trip.link}</a>}
                    primaryText= { trip.link != null ? "Private Link:" : "Get Link" }
                    leftAvatar={<Avatar backgroundColor={indigo400} icon={<FontIcon className="material-icons">link</FontIcon>} />}
                />

                <Divider style={{marginLeft: "15px", paddingTop: "1px", marginRight:"17px", backgroundColor: cyan400}} />

                <ListItem
                    onTouchTap={() => this.handleShare('public')}
                    rightIcon={sharedWith == 'public' && VI(lightBlue400)}
                    style={{marginTop: "10px",marginBottom: "15px"}}
                    primaryText="Public"
                    secondaryText="Anyone can see this trip"
                    leftAvatar={<Avatar backgroundColor={lightBlue400} icon={<FontIcon className="material-icons">public</FontIcon>} />}
                />
                <ListItem
                    onTouchTap={() => this.handleShare('friends')}
                    rightIcon={sharedWith == 'friends' && VI(lightGreen400)}
                    style={{ marginBottom: "15px"}}
                    primaryText="Friends"
                    secondaryText="Your friends will be able to follow this trip"
                    leftAvatar={<Avatar backgroundColor={lightGreen400} icon={<FontIcon className="material-icons">group</FontIcon>} />}
                />
                <ListItem
                    onTouchTap={() => this.handleShare('private')}
                    rightIcon={sharedWith == 'private' && VI(red400)}
                    style={{marginBottom: "15px"}}
                    primaryText="Private"
                    secondaryText="Only you can see this trip"
                    leftAvatar={<Avatar backgroundColor={red400} icon={<FontIcon className="material-icons">vpn_key</FontIcon>} />}
                />
            </Dialog>
        );
    }
}

export default ShareTrip;