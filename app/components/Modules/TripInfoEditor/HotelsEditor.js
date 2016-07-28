import React from 'react';
import {parseShortDate} from 'lib/dateUtils';
import moment from 'moment';
import {reduxForm} from 'redux-form';
import {Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {RangePicker} from 'components/Modules/Form';
import classNames from 'classnames';

var form = reduxForm({
    form: 'AddHotel',
    fields: ['hotelName', 'pricePerNight', 'hotelDates', 'hotelFriends'],
    validate(travel) {
        var errors = {
            hotelName: !travel.hotelName ? 'Hotel name is required' : undefined,
            hotelDates: !travel.hotelDates || !travel.hotelDates.startDate || ! travel.hotelDates.endDate ? 'Hotel dates are required' : undefined,
        };// {tripDestination: 'Test Error'};
        return errors
    }
})

const HotelInfo = ({hotel}) => {
    let hotelInfo = `${hotel.hotelName}, ${hotel.hotelDates.startDate} - ${parseShortDate(hotel.hotelDates.endDate).diff(parseShortDate(hotel.hotelDates.startDate), 'days')} nights`;
    return (
        <li>{hotelInfo}</li>
    )
}

class HotelEditForm extends React.Component {

    render() {
        let {fields, handleSubmit, errors} = this.props;
        return (
            <form className="add-hotel-form two-columns-form" onSubmit={handleSubmit}>
                <FormGroup className={classNames({hasErrors: fields.hotelName.touched && errors.hotelName != null})} key="1" controlId="hotelName">
                    <ControlLabel>Name</ControlLabel>
                    <FormControl placeholder={fields.hotelName.touched && errors.hotelName || "Hotel name"} type="text" {...fields.hotelName}/>
                </FormGroup >
                <FormGroup key="2" controlId="pricePerNight" className={classNames({hasErrors: errors.pricePerNight != null})}>
                    <ControlLabel>Price</ControlLabel>
                    <FormControl placeholder="Per night" type="number" {...fields.pricePerNight}/>
                </FormGroup>
                <FormGroup key="3" controlId="hotelDates" className={classNames({hasErrors: fields.hotelDates.touched && errors.hotelDates != null})}>
                    <ControlLabel>Dates booked</ControlLabel>
                    <RangePicker placeholder={fields.hotelDates.touched && errors.hotelDates || "Pick range"} {...fields.hotelDates} />
                </FormGroup>
                <FormGroup key="4" controlId="hotelFriends" className={classNames({hasErrors: errors.hotelFriends != null})}>
                    <ControlLabel>Who's there?</ControlLabel>
                    <FormControl placeholder="Pick friends" type="text" {...fields.hotelFriends}/>
                </FormGroup>
                <div className="form-actions">
                    <Button type="submit">
                        Add hotel
                    </Button>
                    <Button onClick={this.props.onCancel}>
                        Cancel
                    </Button>
                </div>
            </form>
        )
    }
}

let ReduxForm = form(HotelEditForm);

class HotelsEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {editMode: false};
    }

    showHotelForm() {
        this.setState({editMode: true});
    }

    onCancel() {
        this.setState({editMode: false});
    }

    onAddHotel(values) {
        console.log(JSON.stringify(values));
        this.props.onHotelsChanged(this.props.hotels.concat([values]));
        this.setState({editMode: false});
    }

    render() {
        return (
            <div className="hotels-editor">
                <div className="section-content">
                    <div className="hotels">
                        <ul>
                            {this.props.hotels.map(h => <HotelInfo hotel={h}/>) }
                        </ul>
                    </div>
                    {!this.state.editMode && (
                        <div className="actions-bar">
                            <Button onClick={this.showHotelForm.bind(this)}>Add Hotel</Button>
                        </div>)
                    }
                    {this.state.editMode &&
                    <ReduxForm onCancel={this.onCancel.bind(this)} onSubmit={this.onAddHotel.bind(this)}/>}
                </div>
            </div>
        )
    }
}

export default HotelsEditor;