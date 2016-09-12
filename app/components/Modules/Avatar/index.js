import React from 'react';
import { browserHistory } from 'react-router';
import MUIAvatar from 'material-ui/Avatar';

class Avatar extends React.Component {
    handleClick (event) {
        if (this.props.onClick) {
            this.props.onClick(event);
        } else {
            event.preventDefault();
            browserHistory.push(`/${this.props.id}/profile/trips`)
        }
    }

    render() {
        let {width=45, height=45, id, name} = this.props;
        if (!name) {
            return <MUIAvatar onClick={this.handleClick.bind(this)} src={`https://graph.facebook.com/v2.7/${id}/picture?type=small&width=${width}&height=${height}`} />
            //return <img onClick={this.handleClick.bind(this)} style={{width,height, borderRadius: width/2 + 'px'}} className="avatar" src={`https://graph.facebook.com/v2.7/${id}/picture?type=small&width=${width}&height=${height}`} />;
        }

        return (
            <div className="avatar-container" onClick={this.props.onClick}>
                <MUIAvatar onClick={this.handleClick.bind(this)} src={`https://graph.facebook.com/v2.7/${id}/picture?type=small&width=${width}&height=${height}`} />
                {name && <div className="text" style={this.props.textStyle}>{name}</div>}
            </div>
        )
    }
}

export default Avatar;
