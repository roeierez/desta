import React, {PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import linkState from 'react-link-state';

const styles = {
    button: {
        float: 'right',
        marginLeft: "5px"
    }
};

class TravellerNoteEditor extends React.Component {

    static propTypes = {
        open: PropTypes.bool,
        onSubmit: PropTypes.func,
        onCancel: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            text: ""
        };
    }

    componentWillReceiveProps(newProps) {
        if (this.props.open != newProps.open) {
            this.setState({text: ""});
        }
    }

    render() {
        let {open, onSubmit, onCancel} = this.props;
        return (
            <Dialog open={open} title="Add Note">
                <form>
                    <TextField
                        valueLink={linkState(this, 'text')}
                        ref = "text"
                        fullWidth={true}
                        floatingLabelText="Something to Remember"
                        multiLine={true}
                        rows={2}
                        maxRows={4}
                    /><br />
                    <FlatButton disabled={this.state.text == ""} style={styles.button} label="Save" primary={true} onTouchTap={() => onSubmit(this.refs.text.getValue())} />
                    <FlatButton style={styles.button} label="Cancel" primary={true} onTouchTap={() => onCancel()} />
                </form>
            </Dialog>
        );
    }
}

export default TravellerNoteEditor;
