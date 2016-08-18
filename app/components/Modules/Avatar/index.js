import React from 'react';

class Avatar extends React.Component {
    render() {
        let {width, height, id} = this.props;
        return (
            <img style={{width,height, borderRadius: width/2 + 'px'}} className="avatar" src={`https://graph.facebook.com/v2.7/${id}/picture?type=small&width=${width}&height=${height}`} />
        )
    }
}

export default Avatar;
