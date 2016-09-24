import React, {PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import linkState from 'react-link-state';
import PlacesAutocomplete from 'components/Modules/PlacesAutocomplete';

const styles = {
    button: {
        float: 'right',
        marginLeft: "5px"
    }
};

class PointOfInterestEditor extends React.Component {

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
            this.setState({place: null});
        }
    }

    render() {
        let {open, onSubmit, onCancel} = this.props;
        return (
            <Dialog open={open} title="Add Point of Interest">
                <form>
                    <PlacesAutocomplete
                        ref = "text"
                        placeType="all"
                        fullWidth={true}
                        floatingLabelText="A place to visit"
                        onPlaceSelected={(place) => this.setState({place:place})}
                    /><br />
                    <FlatButton disabled={this.state.place == null} style={styles.button} label="Save" primary={true} onTouchTap={() => onSubmit(this.state.place)} />
                    <FlatButton style={styles.button} label="Cancel" primary={true} onTouchTap={() => onCancel()} />
                </form>
            </Dialog>
        );
    }
}

export default PointOfInterestEditor;
