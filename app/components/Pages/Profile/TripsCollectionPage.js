
import React from 'react';
import TripsGallery from 'components/Modules/TripsGallery';
import ShareTrip from 'components/Modules/ShareTrip';

class TripsCollectionPage extends React.Component {

    render (){
        var {trips, editedTrip, editType, exitShareMode, shareTrip, generateTripLink} = this.props,
            shareDialogOpened = editedTrip != null && editType == 'share',
            tripToShare = shareDialogOpened && trips.find(t => (t.id == editedTrip));
        return (
            <div>
                {tripToShare && (
                        <ShareTrip generateTripLink={generateTripLink} shareTrip={shareTrip} trip={tripToShare} onHide={exitShareMode} container={this} show={shareDialogOpened} />
                    )
                }
                <TripsGallery enterShareMode={this.props.enterShareMode} trips= {this.props.trips.filter(t => t.owner == (this.props.loggedInUser && this.props.loggedInUser.id))} />
            </div>
        );
    }
};

export default TripsCollectionPage;