import React from 'react';
import {getCityClassName} from 'lib/tripUtils';
import {formatTripName} from 'lib/tripUtils';
import {parseShortDate} from 'lib/dateUtils';
import Avatar from 'components/Modules/Avatar';

class VisitedCityListItem extends React.Component {
    render() {
        let {label, visits, city} = this.props,
            visitorsSet = new Set(visits.map(v => {
                return v.user.id
            }))

        return (
            <div onClick={this.props.onSelected} className={"visit-list-item " + this.props.className || ""}>
                {city && <div className={getCityClassName(city)} />}
                <div className="destination-info">
                    <div className="cityAndCountry">
                        <div className="title">{label}</div>
                    </div>
                    <span className="details"></span>
                </div>
                <div className="right-info">
                    {visitorsSet.size <= 2 &&
                        (
                            Array.from(visitorsSet).map(id => {
                                return <Avatar width={45} height={45} id={id} />
                            })
                        )
                    }
                    {visitorsSet.size > 2 && `${visitorsSet.size} People`}
                </div>
            </div>
        )
    }
}

export default VisitedCityListItem;