
import React from 'react';
import TripsGallery from 'components/Modules/TripsGallery';
import ShareTrip from 'components/Modules/ShareTrip';
import PageSpinner from 'components/Modules/PageSpinner';
import Avatar from 'components/Modules/Avatar';
import UserSummary from 'components/Modules/UserSummary';

class TripsCollectionPage extends React.Component {

    componentDidMount() {
        this.props.loadProfile(this.props.params.user_id);
    }

    componentWillUpdate(newProps) {
        if (this.props.params.user_id != newProps.params.user_id) {
            this.props.loadProfile(newProps.params.user_id);
        }
    }

    render (){
        var {loadingProfile, trips, editedTrip, editType, exitShareMode, shareTrip, generateTripLink, removeTripLink} = this.props,
            shareDialogOpened = editedTrip != null && editType == 'share',
            tripToShare = shareDialogOpened && trips.find(t => (t.id == editedTrip));

        if (loadingProfile) {
            return <PageSpinner/>
        }

        return (
            <div className="profileWrapper">
                {tripToShare && (
                        <ShareTrip removeTripLink={removeTripLink} generateTripLink={generateTripLink} shareTrip={shareTrip} trip={tripToShare} onRequestClose={exitShareMode} open={shareDialogOpened} />
                    )
                }
                <UserSummary
                    userName={this.props.owner && this.props.owner.name}
                    userID={this.props.params.user_id}
                    tripsCount={this.props.trips.length}
                    friendsCount={3}
                />
                <TripsGallery deleteTrip={this.props.deleteTrip} enterShareMode={this.props.enterShareMode} trips= {this.props.trips.filter(t => t.owner.facebookID == this.props.params.user_id)} />
            </div>
        );
    }
};

export default TripsCollectionPage;