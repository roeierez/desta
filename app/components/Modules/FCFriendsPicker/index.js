import React from 'react';
import FacebookFriendsAutoComplete from 'components/Modules/FriendsAutocomplete';

class FCFriendsPicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chosenFriends: []
        }
    }

    onSuggestionSelected (suggestion) {
        //this.setState({value: '', chosenFriends: this.state.chosenFriends.concat(suggestion)});

        var existingValue = this.props.value || [];
        this.setState({value: existingValue.concat(suggestion)});
       // this.props.onChange(existingValue.concat(suggestion));
    }

    removeFriend(friend) {
        this.setState({value: this.state.value.filter(f => f.id != friend.id)});
        //var chosenFriends = this.props.value || [];
        //this.props.onChange(chosenFriends.filter(f => f != friend));
    }

    onChange(newValue) {
        this.setState({value: null});
    }

    filterExistingFriends(friends) {
        var chosenFriends = this.props.value || [];
        return friends.filter(f => chosenFriends.map(cf => cf.id).indexOf(f.id) < 0);
    }

    render() {
        var inputProps = this.props.inputProps || {},
            chosenFriends = this.state.value || [];
        if (this.state.value != null) {
            inputProps = Object.assign({}, inputProps, {value: this.state.value});
        }
        return (
            <div className="friends-container" style={this.props.style}>
                <div>
                    {
                        chosenFriends.map(f => (
                            <span onClick={() => this.removeFriend(f)} className="friend-element font-icon font-icon-del">{f.name}</span>
                        ))
                    }
                </div>
                <FacebookFriendsAutoComplete floatingLabelText={false} hintText="Who's coming with you?" style={{marginLeft: '15px'}} filter={this.filterExistingFriends.bind(this)} onChange={this.onChange.bind(this)} inputProps={inputProps} onFriendSelected={this.onSuggestionSelected.bind(this)} />
            </div>
        )
    }
}

export default FCFriendsPicker;
