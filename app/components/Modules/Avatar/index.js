import React from 'react';
import { browserHistory } from 'react-router';

class Avatar extends React.Component {
    handleClick (event) {
        event.preventDefault();
        browserHistory.push(`/${this.props.id}/profile/trips`)
    }

    render() {
        let {width, height, id, name} = this.props;
        if (!name) {
            return <img onClick={this.handleClick.bind(this)} style={{width,height, borderRadius: width/2 + 'px'}} className="avatar" src={`https://graph.facebook.com/v2.7/${id}/picture?type=small&width=${width}&height=${height}`} />;
        }

        return (
            <div className="avatar-container">
                <img onClick={this.handleClick.bind(this)} style={{width,height, borderRadius: width/2 + 'px'}} className="avatar" src={`https://graph.facebook.com/v2.7/${id}/picture?type=small&width=${width}&height=${height}`} />
                {name && <div className="text">{name}</div>}
            </div>
        )
    }
}

export default Avatar;
