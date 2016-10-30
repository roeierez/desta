import React, {Component, PropTypes} from 'react';
import ReactMonthPicker from 'react-month-picker';
import 'react-month-picker/css/month-picker.css';

class MonthPicker extends Component {

    static propTypes = {
        value: PropTypes.object,
        years: PropTypes.arrayOf(PropTypes.number),
        onChange: PropTypes.func
    }

    handleBoxClick() {
        this.refs.picker.show();
    }

    handleRangeDissmis(year, month) {
        this.props.onChange(year, month);
        this.refs.picker.dismiss();
    }

    render() {

        let pickerLang = {
                months: ['Jan', 'Feb', 'Mar', 'Spr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                , from: 'From', to: 'To'
            },
            makeText = m => {
                if (typeof m == "string") {
                    return m;
                }
                if (m && m.year && m.month) return (pickerLang.months[m.month - 1] + '. ' + m.year)
                return '?'
            },
            value = this.props.value, //{year: 2015, month: 11},
            years = [2008, 2010, 2011, 2012, 2014, 2015, 2016, 2017];

        return (
            <div className="month-picker-wrapper">
                <label>Pick A Month</label>
                <ReactMonthPicker ref="picker"
                                  years={years}
                                  value={value}
                                  lang={{
                                      months: ['Jan', 'Feb', 'Mar', 'Spr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                                      , from: 'From', to: 'To'
                                  }}
                                  onChange={this.handleRangeDissmis.bind(this)}
                >
                    <div className="picker-box"
                         onClick={this.handleBoxClick.bind(this)}>
                        <label>{makeText(this.props.value)}</label>
                    </div>
                </ReactMonthPicker>
                <div onClick={this.handleBoxClick.bind(this)} className="material-icons">arrow_drop_down</div>
            </div>
        )
    }
}

export default MonthPicker;
