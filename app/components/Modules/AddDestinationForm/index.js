import React from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import PlacesAutocomplete from '../PlacesAutocomplete';
import FriendsAutocomplete from '../FriendsAutocomplete';
import FCFriendsPicker from 'components/Modules/FCFriendsPicker';

let styles = {
    topField: {
        width: '100%'
    },
    leftDatePicker: {
        width: "150px"
    },
    rightDatePicker: {
        width: "150px"
    },
    bottomField: {
        width: '100%'
    }
}

class AddDestinationForm extends React.Component {

    render() {
        return (
            <div className="add-destination-form">
                <div className="top">
                    <PlacesAutocomplete
                        style={styles.topField}
                    />
                </div>
                <div className="middle">
                    <DatePicker floatingLabelText="Departing" mode="landscape" autoOk textFieldStyle={styles.leftDatePicker} hintText="Departing" container="inline" />
                    <DatePicker floatingLabelText="Returning" mode="landscape" autoOk textFieldStyle={styles.rightDatePicker} hintText="Returning" container="inline" />
                </div>
                <div className="bottom">
                    <FCFriendsPicker
                        style={styles.bottomField}
                    />
                </div>
            </div>
        );
    }
}

export default AddDestinationForm;