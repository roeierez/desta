import React from 'react';

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
                    return <img class="avatar" src={`https://graph.facebook.com/v2.7/${f.id}/picture?type=small&width=100&height=100`} />
                })}
            </div>
        )
    }
}

export default TripFriends;
