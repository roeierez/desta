import React, {PropTypes} from 'react';
import Autocomplete from '../Autocomplete';
import { getFriendsAsync } from 'lib/facebook';
import Avatar from '../Avatar';
import MenuItem from 'material-ui/MenuItem';

class FriendsAutocomplete extends React.Component {

    static propTypes = {
        style: PropTypes.object,
        filter: PropTypes.func,
        onFriendSelected: PropTypes.func,
        floatingLabelText: PropTypes.string
    }

    constructor(props) {
        super(props);
    }

    render() {
        let {floatingLabelText, hintText} = this.props,
            newProps = {};
        if (floatingLabelText !== false) {
            newProps.floatingLabelText = floatingLabelText || "Search";
        }

        if (hintText !== false) {
            newProps.hintText = hintText || "Type a name";
        }

        return (
            <Autocomplete inputStyle={this.props.inputStyle} hintStyle={this.props.hintStyle} textFieldStyle={this.props.textFieldStyle} fullWidth={this.props.fullWidth} ref="autoComplete" {...newProps} style={this.props.style} onSelect={this.props.onFriendSelected} {...this.props.style} search={this.searchFriend.bind(this)} />
        );
    }

    clear(blur) {
        this.refs.autoComplete.clear(blur);
    }

    searchFriend(text) {
        return getFriendsAsync().then(results => {
            var suggestions = results.slice(0, 10);
            if (this.props.filter) {
                suggestions = this.props.filter(suggestions);
            }
            return suggestions.map(s => (
                {
                    text: s.name,
                    textValue: s,
                    value: <MenuItem style={{position: 'relative'}} innerDivStyle={{marginLeft: "35px"}} primaryText={s.name}><Avatar width={35} height={35} style={{position: 'absolute', left: "-30px", top: "7px"}} id={s.id} /></MenuItem>
                }
            ));
        });
    }
}

export default FriendsAutocomplete;