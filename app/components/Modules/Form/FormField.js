import {Col, Row} from 'react-bootstrap';
import React from 'react';
import Help from './Help';
import classNames  from 'classnames';

const FormField = ({field, help, inputClass, inputProps, label, children}) => {
    var error = field.touched && field.error;

    return (
        <Col sm={12}>
            <Row className={classNames('form-group', {'has-error': error})}>
                <Col sm={12}>
                    <label htmlFor={inputProps.id}>{label}</label>
                    {help && <Help text={help}/>}
                </Col>
                <Col sm={12} className={inputClass}>
                    {children}
                    {error && <p className="help-block" style={{marginBottom: 0}}>{error}</p>}
                </Col>
            </Row>
        </Col>
    )
}

module.exports = FormField