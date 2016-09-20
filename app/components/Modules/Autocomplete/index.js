import React, {PropTypes} from 'react';
import AutoComplete from 'material-ui/AutoComplete';

class Autocomplete extends React.Component {

    static propTypes = {
        hintText: PropTypes.string,
        search: PropTypes.func,
        onSelect: PropTypes.func,
        floatingLabelText: PropTypes.string,
        style: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        };
    }

    render() {
        let {hintText, search, floatingLabelText } = this.props;
        return (
            <AutoComplete style={this.props.style} filter={AutoComplete.caseInsensitiveFilter} onNewRequest={this.onNewRequest.bind(this)} dataSource={this.state.dataSource || []} hintText={hintText} floatingLabelText={floatingLabelText} onUpdateInput={this.onSearch.bind(this)} />
        );
    }

    onNewRequest(text, index) {
        if (index >= 0) {
            this.props.onSelect(this.state.dataSource[index].textValue || this.state.dataSource[index].value);
        }
    }

    onSearch(text) {
        if (this.props.search) {
            this.props.search(text)
                .then(dataSource => {
                    this.setState({dataSource});
                });
        }
    }
}

export default Autocomplete;
