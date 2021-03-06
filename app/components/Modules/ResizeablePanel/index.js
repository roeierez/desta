import React, {PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {grey300} from 'material-ui/styles/colors';

let styles={
    header: {
        borderColor: grey300,
        borderBottom: "1px solid " + grey300,
        margin: "0px 0px 0px 15px",
        paddingLeft: "0px",
        paddingRight: "0px"
    }
}

class ResizeablePanel extends React.Component {

    static propTypes = {
        title: PropTypes.any,
        style: PropTypes.object,
        rightIcon: PropTypes.any,
        expandable: PropTypes.bool
    }

    render() {
        let titleProps = {};
        if (this.props.expandable) {
            titleProps.actAsExpander=true;
            titleProps.showExpandableButton=true;
        }
        return (
            <Paper style={this.props.style} zDepth={2}>
                <Card style={{height: '100%'}}>
                    {
                        this.props.title && (
                            <CardHeader {...titleProps} style={styles.header} title={this.props.title} >
                                {this.props.rightIcon}
                            </CardHeader>
                        )
                    }
                    <CardMedia expandable={this.props.expandable ==  true}>
                        {this.props.children}
                    </CardMedia>
                </Card>
            </Paper>
        )
    }
}

export default ResizeablePanel;
