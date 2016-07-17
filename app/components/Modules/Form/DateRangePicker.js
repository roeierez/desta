import React from 'react';
import {Button, Glyphicon} from 'react-bootstrap';
import DateRangePicker from 'react-bootstrap-daterangepicker';
var moment = require('moment');

class RangePicker extends  React.Component{
    handleEvent(event, picker) {
        this.props.onChange({
                startDate: picker.startDate,
                endDate: picker.endDate
            }
        );
    }

    render () {
        var start = (this.props.value.startDate || moment()).format('YYYY-MM-DD');
        var end = (this.props.value.endDate || moment()).format('YYYY-MM-DD');
        var label = start + ' - ' + end;
        if (start === end) {
            label = start;
        }
        return (
            <DateRangePicker startDate={this.props.startDate} endDate={this.props.endDate} onEvent={this.handleEvent.bind(this)}>
                <Button className="selected-date-range-btn" style={{width:'100%'}}>
                    <div className="pull-left"><Glyphicon glyph="calendar" /></div>
                    <div className="pull-right">
									<span>
										{label}
									</span>
                        <span className="caret"></span>
                    </div>
                </Button>
            </DateRangePicker>
        );
    }
};


module.exports = RangePicker;