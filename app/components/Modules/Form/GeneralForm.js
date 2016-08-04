import React from 'react';
import {parseShortDate} from 'lib/dateUtils';
import moment from 'moment';
import {reduxForm} from 'redux-form';
import {Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {RangePicker} from 'components/Modules/Form';
import classNames from 'classnames';
import FCFriendsPicker from 'components/Modules/FCFriendsPicker';

var createGenericForm = (fieldsDefinitions) => {
    return  (props) => {
        let {fields, handleSubmit, errors, submitText, cancelText, onCancel} = props,        
            fieldsComponents = fieldsDefinitions.map( def => {
                switch(def.type) {
                    case 'text':
                    case 'number':
                        return (
                            <FormControl placeholder={fields[def.key].touched && errors[def.key] || def.placeholder || def.label} type={def.type} {...fields[def.key]}/>
                        )                        
                    case 'rangePicker':
                        return (
                            <RangePicker placeholder={fields[def.key].touched && errors[def.key] || "Pick range"} {...fields[def.key]} />
                        )
                    case 'friendsPicker':
                        return (
                            <FCFriendsPicker inputProps={{placeholder:def.placeholder}} {...fields[def.key]} />
                        )
                }
            }),
            formComponents = fieldsComponents.map( (fc, i) => {
                let def = fieldsDefinitions[i];
                return (
                    <FormGroup key={i} controlId={def.key} className={classNames({hasErrors: fields[def.key].touched && errors[def.key] != null})}>
                        <ControlLabel>{def.label}</ControlLabel>
                        {fc}
                    </FormGroup>
                )
            });

        
        return (
            <form className="generic-form two-columns-form" onSubmit={handleSubmit}>
                {formComponents}
                <div className="form-actions">
                    {submitText && (
                        <Button type="submit">
                            {submitText}
                        </Button>
                    )}
                    {cancelText && (
                        <Button onClick={onCancel}>
                            {cancelText}
                        </Button>
                    )}                                      
                </div>
            </form>
        )
    }
}    

export default function createForm(name, fieldDefinitions, validateFn) {
    debugger;
    var form = reduxForm({
        form: name,
        fields: fieldDefinitions.map(fd => fd.key),
        validate(form) {
            return validateFn(form);
        }
    });

    return form(createGenericForm(fieldDefinitions));
}