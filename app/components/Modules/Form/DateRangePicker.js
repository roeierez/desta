import React from 'react';
import {Button, Glyphicon} from 'react-bootstrap';
import DateRangePicker from 'react-bootstrap-daterangepicker';
var moment = require('moment');

class RangePicker extends  React.Component{
    handleEvent(event, picker) {
        this.props.onChange({
                startDate: picker.startDate && picker.startDate.format('YYYY-MM-DD'),
                endDate: picker.endDate && picker.endDate.format('YYYY-MM-DD')
            }
        );
    }

    render () {
        var placeHolderClass="-placeholder";
        var start = this.props.value.startDate && moment(this.props.value.startDate);
        var end = this.props.value.endDate && moment(this.props.value.endDate);
        var label = this.props.title || this.props.placeholder || '';
        if (!this.props.title && (start || end)) {
            placeHolderClass = "";
            label = start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD');;
            if (start === end) {
                label = start.format('YYYY-MM-DD');;
            }
        }
        return (
            <DateRangePicker {...this.props} autoUpdateInput={false} startDate={start} endDate={end} onApply={this.handleEvent.bind(this)}>
                {this.props.innerComponent && this.props.innerComponent }
                {!this.props.innerComponent && (
                    <Button className="selected-date-range-btn" style={{width:'100%'}}>
                        <div className="pull-left">
                            <span className={"text" + placeHolderClass}>
                                            {label}
                                        </span>
                        </div>
                    </Button>
                )}
            </DateRangePicker>
        );
    }
};


module.exports = RangePicker;