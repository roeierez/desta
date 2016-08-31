
import React from 'react';
import TripsGallery from 'components/Modules/TripsGallery';
import ShareTrip from 'components/Modules/ShareTrip';
import PageSpinner from 'components/Modules/PageSpinner';

class TripsCollectionPage extends React.Component {

    componentDidMount() {
        this.props.loadProfile(this.props.params.user_id);
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
                <TripsGallery enterShareMode={this.props.enterShareMode} trips= {this.props.trips.filter(t => t.owner == this.props.params.user_id)} />
            </div>
        );
    }
};

export default TripsCollectionPage;