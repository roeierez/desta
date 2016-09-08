import React from 'react';
import Autosuggest from 'components/Modules/Autosuggest';
import { getFriendsAsync } from 'lib/facebook';

class FacebookFriendsAutoComplete extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isLoading: false, suggestions: [], value: ''};
    }

    loadSuggestions(value) {
        this.setState({
            isLoading: true
        });

        getFriendsAsync().then(results => {
            var suggestions = results.filter(f => f.name.toLowerCase().indexOf(value.value.toLowerCase()) == 0).slice(0, 10);
            if (this.props.filter) {
                suggestions = this.props.filter(suggestions);
            }
            this.setState({
                isLoading: false,
                suggestions
            });

        });
    }

    getSuggestionValue (friend) {
        return friend.name;
    }

    renderSuggestion (friend) {
        return <div className="suggested-item"><img class="avatar" src={`https://graph.facebook.com/v2.7/${friend.id}/picture?type=small&width=45&height=45`} />{friend.name} </div>;
    }

    onChange(event, { newValue }) {
        this.setState({
            value: newValue
        });

        if (this.props.onChange) {
            this.props.onChange(newValue);
        }
    }

    onSuggestionSelected(event, { suggestion, suggestionValue, sectionIndex, method }) {
        this.setState({selectedFriend: suggestionValue});
        if (this.props.onSuggestionSelected) {
            this.props.onSuggestionSelected(suggestion);
        }
    }

    render() {
        const { value, suggestions, isLoading } = this.state,
            inputProps = {
                value,
                onChange: this.onChange.bind(this),
                ...this.props.inputProps
            };

        return (
            <Autosuggest suggestions={suggestions}
                         onSuggestionSelected={this.onSuggestionSelected.bind(this)}
                         onSuggestionsFetchRequested={this.loadSuggestions.bind(this)}
                         getSuggestionValue={this.getSuggestionValue.bind(this)}
                         renderSuggestion={this.renderSuggestion.bind(this)}
                         inputProps={inputProps} />
        )
    }
}

export default FacebookFriendsAutoComplete;
