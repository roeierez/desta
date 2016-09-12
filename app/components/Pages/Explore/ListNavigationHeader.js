import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

let ListNavigationHeader = ({title, backTitle, onBack}) => {
    return (
        <div className="list-navigation-header">
            {backTitle && (
                <FlatButton
                    onTouchTap={onBack}
                    label={backTitle}
                    secondary={true}
                    hoverColor= "white"
                    style={{cursor: "pointer", marginLeft: "-15px"}}
                    icon={<ArrowBack />}
                />
            )}
            <div className="title">{title}</div>
        </div>
    )
}

export default ListNavigationHeader;
