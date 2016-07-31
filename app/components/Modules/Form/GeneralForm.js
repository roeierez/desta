import React from 'react';
import {parseShortDate} from 'lib/dateUtils';
import moment from 'moment';
import {reduxForm} from 'redux-form';
import {Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {RangePicker} from 'components/Modules/Form';
import classNames from 'classnames';

class GenericForm extends React.Component {

    render () {
        let {fields, handleSubmit, errors, fieldsDefinitions} = this.props,        
            fieldsComponents = fieldsDefinitions.map( def => {
                switch(def.type) {
                    case 'text':
                    case 'number':
                        return (
                            <FormControl placeholder={def.label} type={def.type} {...fields[def.label]}/>
                        )                        
                    case 'rangePicker':
                        return (
                            <RangePicker placeholder={fields[def.label].touched && errors[def.label] || "Pick range"} {...fields[def.label]} />
                        )
                }
            }),
            formComponents = fieldsComponents.map( (fc, i) => {
                let def = fieldsComponents[i];
                return (
                    <FormGroup key={i} controlId={def.label} className={classNames({hasErrors: fields[def.label].touched && errors[label] != null})}>
                        <ControlLabel>{def.label}}</ControlLabel>
                        {fc}
                    </FormGroup>
                )
            })

        
         return (
            <form className="two-columns-form" onSubmit={handleSubmit}>
                {formComponents}
            </form>
         )
    }
}

export default function createForm(name, fieldDefinitions, validateFn) {
    var form = reduxForm({
        form: name,
        fields: fieldDefinitions.map(fd => fd.label),
        validate(form) {
            return validateFn(form);
        }
    });

    return form(GenericForm);
}