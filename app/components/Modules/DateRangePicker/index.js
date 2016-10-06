import React from 'react';
import {DateRangePicker} from 'react-dates';
import moment from 'moment';

class Picker extends React.Component {
    constructor(props){
        super(props);
        this.state = {focusedInput: null, start: null, end: null}
    }

    onDatesChange(dates) {
        this.setState({start: dates.startDate, end: dates.endDate}, () => {
            this.props.onChange(dates);
        });
    }

    render() {
        return (
            <DateRangePicker withPortal={true} startDate={this.state.start} endDate={this.state.end} onDatesChange={this.onDatesChange.bind(this)} onFocusChange={(data) => { this.setState({focusedInput: data})}} focusedInput={this.state.focusedInput}/>
        );
    }
}

export default Picker;
