import React from 'react'
import Avatar from 'components/Modules/Avatar';
import moment from 'moment';

class PersonVisitListItem extends React.Component {

    render() {
        let {visit} = this.props,
            createdDate = moment(visit.created_date);

        return (
            <div onClick={this.props.onSelected} className={"visit-list-item " + this.props.className || ""}>
                <Avatar width={45} height={45} id={visit.user.id} />
                <div className="destination-info">
                    <div className="cityAndCountry">
                        <div className="title">{`${visit.place.location.city}`}</div>
                        <div className="country">{`${visit.place.location.country}`}</div>
                    </div>
                    <span className="details"></span>
                </div>
                <div className="right-info">
                    {createdDate.format('MMMM DD')}
                </div>
            </div>
        )
    }
}

export default PersonVisitListItem;
