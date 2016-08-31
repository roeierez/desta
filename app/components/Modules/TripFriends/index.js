import React from 'react';
import Avatar from 'components/Modules/Avatar';

class TripFriends extends React.Component {
    render() {
        let {trip} = this.props,
            destinations = trip.destinations,
            friends = [];

        destinations.forEach(d => {
            if (d.tripFriends) {
                friends = friends.concat(d.tripFriends);
            }
        });

        return (
            <div className={"trip-friends-list " + (this.props.className || '')}>
                {friends.map( f => {
                    return <Avatar id={f.id} width={45} height={45}/>
                })}
            </div>
        )
    }
}

export default TripFriends;
