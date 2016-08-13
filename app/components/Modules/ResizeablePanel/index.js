import React from 'react';
import {Panel} from 'react-bootstrap';

class ResizeablePanel extends React.Component {
    render() {
        return (
            <Panel  className={"resizeable-panel " + (this.props.className || "")} header={this.props.header || this.createHeader()} >
                {this.props.children}
            </Panel>
        )
    }

    createHeader() {
        return (
            <div className={"title-wrapper"}>
                <span className="title">{this.props.title}</span>
                {this.props.resize && (
                    <span className="toolbar">
                        <i className="fa fa-expand" aria-hidden="true"></i>
                    </span>
                )}
            </div>
        )
    }
}

export default ResizeablePanel;
