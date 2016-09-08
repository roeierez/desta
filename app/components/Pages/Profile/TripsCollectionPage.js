
import React from 'react';
import TripsGallery from 'components/Modules/TripsGallery';
import ShareTrip from 'components/Modules/ShareTrip';
import PageSpinner from 'components/Modules/PageSpinner';
import Avatar from 'components/Modules/Avatar';

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
        var {loadingProfile, trips, editedTrip, editType, exitShareMode, shareTrip, generateTripLink} = this.props,
            shareDialogOpened = editedTrip != null && editType == 'share',
            tripToShare = shareDialogOpened && trips.find(t => (t.id == editedTrip));

        if (loadingProfile) {
            return <PageSpinner/>
        }

        return (
            <div>
                {tripToShare && (
                        <ShareTrip generateTripLink={generateTripLink} shareTrip={shareTrip} trip={tripToShare} onHide={exitShareMode} container={this} show={shareDialogOpened} />
                    )
                }
                <div className="user-profile-header">
                    <div className="user-details">
                        <Avatar id={this.props.params.user_id} name={this.props.owner && this.props.owner.name} width={50} height={50} />
                    </div>
                </div>
                <TripsGallery enterShareMode={this.props.enterShareMode} trips= {this.props.trips.filter(t => t.owner.facebookID == this.props.params.user_id)} />
            </div>
        );
    }
};

export default TripsCollectionPage;