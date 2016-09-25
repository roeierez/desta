import TripSummary from './TripSummary';
import React from 'react';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import GridList, {GridTile} from 'material-ui/GridList';
import classNames from 'classnames';
import {getCityClassName, getCityImage, formatTitleAndSubtitle} from 'lib/tripUtils';
import {SocialShare} from 'material-ui/svg-icons';
import IconButton from 'material-ui/IconButton';
import {browserHistory} from 'react-router';

const styles = {
    gridList: {
        width: 600,
        padding: '5px'
    },
    gridTile: {
        cursor: 'pointer',
        border: '4px solid white'
    }
};

const TripCard = ({tripInfo, enterShareMode}) => {
    let titleAndSub = formatTitleAndSubtitle(tripInfo),
        onShare = (event) => {
            event.preventDefault();
            event.stopPropagation();
            enterShareMode(tripInfo);
        }

    return (
        <GridTile
            style={styles.gridTile}
            subtitle={titleAndSub.subtitle}
            onTouchTap={() => browserHistory.push(`/${tripInfo.owner.facebookID}/profile/trips/${tripInfo.id}`)}
            key={tripInfo.id}
            title={<div style={{fontWeight:500, fontSize: "20px", marginBottom: "10px"}}>{titleAndSub.title} </div>}
            actionIcon={<IconButton onTouchTap={onShare}><SocialShare onTouchTap={onShare} color="white" /></IconButton>}
            actionPosition="right"
            titlePosition="top"
            titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
            cols={1}
            rows={1}
        >
            <img src={getCityImage(tripInfo.destinations[0].tripDestination.cityName)} />
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
                            <TripCard tripInfo={t} enterShareMode={this.props.enterShareMode} />
                        ))}
                    </GridList>
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}
export default TripsGallery