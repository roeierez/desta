import React from 'react';
import {getCityClassName} from 'lib/tripUtils';
import moment from 'moment';
import {Modal} from 'react-bootstrap';
require('clipboard/dist/clipboard');

class ShareTrip extends React.Component {

    shareTrip (audience) {
        this.props.shareTrip(this.props.trip, audience);
    }

    generateLink () {
        this.props.generateTripLink(this.props.trip);
    }

    copyLink () {
        window.clipboardData.setData('Text', this.props.trip.link);
        window.clipboardData.setData('text/plain', this.props.trip.link);
    }

    render() {
        let {trip, onHide, show, container} = this.props,
            destinations = trip.destinations.map(d => d.tripDestination.cityName),
            sharedWidth = trip.shareAudience || 'public',
            startDates = trip.destinations.map(d => moment(d.tripDates.startDate)),
            endDates = trip.destinations.map(d => moment(d.tripDates.endDate)),
            minDate = moment.min(startDates),
            maxDate = moment.max(endDates);

        return (
            <Modal onHide={onHide} container={container} show={show}>
                <Modal.Header closeButton>
                    <Modal.Title>Share Trip</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="share-trip-dialog">
                        <div className="trip-heading">
                            <div className={getCityClassName(destinations[0])} />
                            <div className="trip-info">
                                <div className="title">{destinations.join(',')}</div>
                                <div className="trip-dates">{`${minDate.format('ll')} - ${maxDate.format('ll')}`}</div>
                            </div>
                        </div>
                        <div className="share-types">
                            <div className="link">
                                <div className="share-text">
                                    <div className="icon-wrapper" onClick={this.generateLink.bind(this)}>
                                        <i className="fa fa-2x fa-link" aria-hidden="true"></i>
                                    </div>
                                    {trip.link != null && <div className="generated-link">
                                                                Private Link: <a value={trip.link} id="trip-link" href={trip.link}>{trip.link}</a>
                                                                <button class="btn" data-clipboard-text={trip.link}><i className="fa fa-clipboard" aria-hidden="true"></i></button>
                                                            </div>}
                                    {trip.link == null && "Get link"}
                                </div>
                            </div>
                            <div className="separator" />
                            <div className="public" onClick={this.shareTrip.bind(this, 'public')}>
                                <div className="share-text">
                                    <div className="icon-wrapper">
                                        <i className="fa fa-2x fa-rss" aria-hidden="true"></i>
                                    </div>
                                    <div className="text">{"Public"}</div>
                                    { (sharedWidth == 'public' || !sharedWidth) && <i className="fa fa-2x fa-check" aria-hidden="true"></i>}
                                </div>
                            </div>
                            <div className="friends" onClick={this.shareTrip.bind(this, 'friends')}>
                                <div className="share-text">
                                    <div className="icon-wrapper">
                                        <i className="fa fa-2x fa-users" aria-hidden="true"></i>
                                    </div>
                                    <div className="text">{"Friends"}</div>
                                    {sharedWidth == 'friends' && <i className="fa fa-2x fa-check" aria-hidden="true"></i>}
                                </div>
                            </div>
                            <div className="private" onClick={this.shareTrip.bind(this, 'private')}>
                                <div className="share-text">
                                    <div className="icon-wrapper">
                                        <i className="fa fa-2x fa-lock" aria-hidden="true"></i>
                                    </div>
                                    <div className="text">{"Private"}</div>
                                    {sharedWidth == 'private' && <i className="fa fa-2x fa-check" aria-hidden="true"></i>}
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}

export default ShareTrip;
