import React, {PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import PlacesAutocomplete from 'components/Modules/PlacesAutocomplete';
import moment from 'moment';
import DatePicker from 'material-ui/DatePicker';

const styles = {
    button: {
        float: 'right',
        marginLeft: "5px"
    }
};

class HotelEditor extends React.Component {

    static propTypes = {
        open: PropTypes.bool,
        onSubmit: PropTypes.func,
        onCancel: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            place: null,
            startDate: new Date(),
            endDate: moment(new Date()).add(1, 'days').toDate()
        };
    }

    componentWillReceiveProps(newProps) {
        if (this.props.open != newProps.open) {
            this.setState({place: null, startDate: null, endDate: null});
        }
    }

    render() {
        let {open, onSubmit, onCancel} = this.props;
        return (
            <Dialog open={open} title="Add Hotel">
                <form>
                    <PlacesAutocomplete
                        placeType="all"
                        fullWidth={true}
                        hintText="Type hotel name"
                        floatingLabelText="Search hotels"
                        onPlaceSelected={(place) => this.setState({place:place})}
                    /><br />
                    <div className="dates-wrapper">
                        <DatePicker onChange={(e, value) => this.setState({startDate: value})} autoOk mode="landscape" container="inline" floatingLabelText="Checking in" />
                        <DatePicker onChange={(e, value) => this.setState({endDate: value})} autoOk mode="landscape" container="inline" floatingLabelText="Checking out"/>
                    </div>
                    <FlatButton disabled={this.state.place == null} style={styles.button} label="Save" primary={true} onTouchTap={() => onSubmit({...this.state, description: this.state.place.description})} />
                    <FlatButton style={styles.button} label="Cancel" primary={true} onTouchTap={() => onCancel()} />
                </form>
            </Dialog>
        );
    }
}

export default HotelEditor;
