import React from 'react';
import FacebookFriendsAutoComplete from 'components/Modules/FriendsAutocomplete';
import Chip from 'material-ui/Chip';
import Avatar from 'components/Modules/Avatar';
import MUIAvatar from 'material-ui/Avatar';
import {formatPhotoURL} from 'lib/facebook';
import FontIcon from 'material-ui/FontIcon';

class FCFriendsPicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: []
        }
    }

    onSuggestionSelected (suggestion) {
        //this.setState({value: '', chosenFriends: this.state.chosenFriends.concat(suggestion)});

        var value = (this.props.value || []).concat([Object.assign({}, suggestion)]);;
        this.setState({value}, () => {
            this.refs.autoComplete.clear();
            this.props.onChange(value);
        });
    }

    removeFriend(friend) {
        let value = this.state.value.filter(f => f.id != friend.id);
        this.setState({value}, () => {
            this.refs.autoComplete.clear();
            this.props.onChange(Object.assign({}, value));
        });
    }

    filterExistingFriends(friends) {
        var chosenFriends = this.props.value || [];
        return friends.filter(f => chosenFriends.map(cf => cf.id).indexOf(f.id) < 0);
    }

    render() {
        var inputProps = this.props.inputProps || {},
            chosenFriends = this.state.value || [];

        return (
            <div className="friends-container" style={this.props.style}>
                <FacebookFriendsAutoComplete ref="autoComplete" floatingLabelText={"Who's coming with you?"} hintText="Type friends names" style={{marginLeft: '15px'}} filter={this.filterExistingFriends.bind(this)} onFriendSelected={this.onSuggestionSelected.bind(this)} />
                <div className="avatars-container">
                    {
                        chosenFriends.map(f => (
                            <Chip
                                style={{marginTop: 5, marginRight: 5}}

                                onRequestDelete={() => this.removeFriend(f)}>
                                <MUIAvatar size={25} src={formatPhotoURL(f.id, 25)}></MUIAvatar>
                                {f.name}
                            </Chip>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default FCFriendsPicker;
