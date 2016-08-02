import React from 'react';
import FacebookFriendsAutoComplete from 'components/Modules/FacebookFriendsAutoComplete';

class FCFriendsPicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chosenFriends: []
        }
    }

    onSuggestionSelected (suggestion) {
        //this.setState({value: '', chosenFriends: this.state.chosenFriends.concat(suggestion)});
        this.setState({value: ''});
        var existingValue = this.props.value || [];
        this.props.onChange(existingValue.concat(suggestion));
    }

    removeFriend(friend) {
        //this.setState({chosenFriends: this.state.chosenFriends.filter(f => f != friend)});
        var chosenFriends = this.props.value || [];
        this.props.onChange(chosenFriends.filter(f => f != friend));
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
            chosenFriends = this.props.value || [];
        if (this.state.value != null) {
            inputProps = Object.assign({}, inputProps, {value: this.state.value});
        }
        return (
            <div className="friends-container">
                {
                    chosenFriends.map(f => (
                        <span onClick={() => this.removeFriend(f)} className="friend-element font-icon font-icon-del">{f.name}</span>
                    ))
                }
                <FacebookFriendsAutoComplete filter={this.filterExistingFriends.bind(this)} onChange={this.onChange.bind(this)} inputProps={inputProps} onSuggestionSelected={this.onSuggestionSelected.bind(this)} />
            </div>
        )
    }
}

export default FCFriendsPicker;
