import React from 'react';
import {parseShortDate} from 'lib/dateUtils';
import moment from 'moment';
import {reduxForm} from 'redux-form';
import {Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {RangePicker} from 'components/Modules/Form';
import classNames from 'classnames';
import createForm from 'components/Modules/Form/GeneralForm';

const POIInfo = ({poi}) => {
    let poiInfo = `${poi.name}`;
    return (
        <li>{hotelInfo}</li>
    )
}

class POIEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {editMode: false};
    }

    showForm() {
        this.setState({editMode: true});
    }

    onCancel() {
        this.setState({editMode: false});
    }

    onAdd(values) {
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
                            {this.props.pois.map(h => <POIInfo poi={h}/>) }
                        </ul>
                    </div>
                    {!this.state.editMode && (
                        <div className="actions-bar">
                            <Button onClick={this.showForm.bind(this)}>Add Point</Button>
                        </div>)
                    }
                    {this.state.editMode &&
                        createForm('POIEditor', [
                            {type: 'text', label: 'Point name'}
                        ], (values) => {})                    
                }
                </div>
            </div>
        )
    }
}

export default POIEditor;