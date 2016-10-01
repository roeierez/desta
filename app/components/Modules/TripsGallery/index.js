import React from 'react';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import GridList, {GridTile} from 'material-ui/GridList';
import classNames from 'classnames';
import {getCityClassName, getCityImage, formatTitleAndSubtitle} from 'lib/tripUtils';
import {SocialShare, NavigationMoreVert} from 'material-ui/svg-icons';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import {browserHistory} from 'react-router';
import MenuItem from 'material-ui/MenuItem'

const styles = {
    gridList: {
        width: 600,
        padding: '0px'
    },
    gridTile: {
        cursor: 'pointer',
        border: '4px solid white'
    }
};

const TripCard = ({tripInfo, enterShareMode, deleteTrip}) => {
    let titleAndSub = formatTitleAndSubtitle(tripInfo),
        onShare = (event) => {
            event.preventDefault();
            event.stopPropagation();
            enterShareMode(tripInfo);
        },
        deleteCurrentTrip = (e, child) => {
            e.preventDefault();
            e.stopPropagation();
            deleteTrip(tripInfo.id);
        },
        actionsMenue = (
            <IconMenu
                onTouchTap={(e) => {e.preventDefault(); e.stopPropagation()}}
                iconStyle={{color: 'white'}}
                iconButtonElement={<IconButton><NavigationMoreVert /></IconButton>}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                onItemTouchTap={deleteCurrentTrip}
            >
                <MenuItem primaryText="Delete" />
            </IconMenu>
        ),
        firstDestination = tripInfo.destinations[0].tripDestination;


    return (
        <GridTile
            style={styles.gridTile}
            subtitle={titleAndSub.subtitle}
            onTouchTap={() => browserHistory.push(`/${tripInfo.owner.facebookID}/profile/trips/${tripInfo.id}`)}
            key={tripInfo.id}
            title={<div style={{fontWeight:500, fontSize: "20px", marginBottom: "10px"}}>{titleAndSub.title} </div>}
            actionIcon={<div><IconButton onTouchTap={onShare}><SocialShare onTouchTap={onShare} color="white" /></IconButton>{actionsMenue}</div>}
            actionPosition="right"
            titlePosition="top"
            titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
            cols={1}
            rows={1}
        >
            <img src={getCityImage(null, tripInfo)} />
        </GridTile>
    )
}

class TripsGallery extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var {trips} = this.props;
        return (
            <div className="trips-gallery">
                <ReactCSSTransitionGroup transitionLeaveTimeout={350} transitionName="component-fade"
                                         transitionAppear={true} transitionAppearTimeout={1000}>
                    <GridList
                        cols={1}
                        cellHeight={250}
                        padding={15}
                        style={styles.gridList}>
                        {trips && trips.map(t => (
                            <TripCard tripInfo={t} enterShareMode={this.props.enterShareMode} deleteTrip={this.props.deleteTrip}/>
                        ))}
                    </GridList>
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}
export default TripsGallery