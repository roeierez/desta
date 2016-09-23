import React from 'react';
import CircularProgress from 'material-ui/CircularProgress'

class PageSpinner extends React.Component {
    render() {
        return (
            <CircularProgress style={{margin: 'auto'}} className="page-spinner" />
        )
    }
}

export default PageSpinner;
