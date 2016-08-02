import React from 'react';
import {parseShortDate} from 'lib/dateUtils';
import moment from 'moment';
import {reduxForm} from 'redux-form';
import {Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {RangePicker} from 'components/Modules/Form';
import classNames from 'classnames';
import createForm from 'components/Modules/Form/GeneralForm';

const NoteInfo = ({note}) => {  
    return (
        <li>{note.text}</li>
    )
}

class TravellerNotesEditor extends React.Component {

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
        this.props.onChange(this.props.notes.concat([values]));
        this.setState({editMode: false});
    }

    render() {
        return (
            <div className="hotels-editor">
                <div className="section-content">
                    <div className="hotels">
                        <ul>
                            {this.props.notes.map(h => <NoteInfo note={h}/>) }
                        </ul>
                    </div>
                    {!this.state.editMode && (
                        <div className="actions-bar">
                            <Button bsStyle="primary" onClick={this.showForm.bind(this)}><span className="font-icon font-icon-plus-1">New Note</span></Button>
                        </div>)
                    }
                    {this.state.editMode && React.createElement(
                            createForm('TravellerNotesEditor', [
                                {type: 'text', label: 'Note', key: 'text'}                                
                            ], (values) => {
                                if (values.text == '' || !values.text) {
                                    return {
                                        text: 'Text is required'
                                    }
                                }
                            }),
                            {
                                submitText: 'Add Note',
                                onSubmit: this.onAdd.bind(this),
                                cancelText: 'Cancel',
                                onCancel: this.onCancel.bind(this)
                            }
                        )                    
                    }
                </div>
            </div>
        )
    }
}

export default TravellerNotesEditor;