import React from 'react';
import MapView from 'components/Modules/MapView'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from 'redux-modules';

@connect(
    state => {
        return {...state.explore}
    },
    dispatch => bindActionCreators({
        ...actionCreators.explore,
    }, dispatch),
)
class Explore extends React.Component {

    componentDidMount() {
        this.props.fetchLocations();
        this.props.setPageLinks([
            {
                to: `/explore/past`,
                label: 'Travels History'
            },
            {
                to: `/explore/current`,
                label: 'Traveling Now'
            },
            {
                to: `/explore/future`,
                label: 'Future Travels'
            }
        ])
    }

    componentWillUnmount () {
        this.props.setPageLinks(null);
    }

    render() {
        let locations = (this.props.friendsLocations || []).map(fl => ({location: fl.location, icon: fl.user.photo, title: fl.title, label: fl.label }));
        return (
            <div className="explore-page">
                <MapView locations={locations} />
            </div>
        )
    }
}

export default Explore;