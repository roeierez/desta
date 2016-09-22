import React, {PropTypes} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import ReactDom from 'react-dom';

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
            dataSource: [],
            searchText: ""
        };
    }

    render() {
        let {hintText, search, floatingLabelText } = this.props,
            valueProps = {};

        return (
            <AutoComplete searchText={this.state.searchText} ref="autoComplete" style={this.props.style} filter={AutoComplete.caseInsensitiveFilter} onNewRequest={this.onNewRequest.bind(this)} dataSource={this.state.dataSource || []} hintText={hintText} floatingLabelText={floatingLabelText} onUpdateInput={this.onSearch.bind(this)} />
        );
    }

    onNewRequest(text, index) {
        if (index >= 0) {
            this.props.onSelect(this.state.dataSource[index].textValue || this.state.dataSource[index].value);
        }

        this.setState({searchText: 'a'}, () => {
            this.setState({searchText: ''}, () => {
                this.refs.autoComplete.focus();
            });
        });

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
