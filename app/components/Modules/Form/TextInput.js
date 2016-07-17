import React from 'react';
import FormField from './FormField';

const TextInput = ({field, help, label, onChange, ...inputProps}) => {
    return (
        <FormField field={field} help={help} inputProps={inputProps} label={label}>
            <input
                {...field}
                className="form-control"
                name={field.name}
                onBlur={field.onBlur}
                onChange={onChange && field.onChange}
            />
        </FormField>
    )
}

module.exports = TextInput