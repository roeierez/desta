import {Glyphicon, OverlayTrigger, Tooltip}  from 'react-bootstrap';
import React from 'react';

const Help = ({text}) => {
    var tooltip = <Tooltip>{text}</Tooltip>
    return (
        <OverlayTrigger overlay={tooltip} delayShow={300} delayHide={150}>
            <Glyphicon className="Help" glyph="question-sign"/>
        </OverlayTrigger>
    );
};

module.exports = Help