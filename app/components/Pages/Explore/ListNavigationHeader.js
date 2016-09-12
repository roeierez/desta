import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

let ListNavigationHeader = ({title, backTitle, onBack, rightLink, onRightLinkClick}) => {
    return (
        <div className="list-navigation-header">
            {backTitle && (
                <FlatButton
                    onTouchTap={onBack}
                    label={backTitle}
                    primary={true}
                    hoverColor= "white"
                    style={{cursor: "pointer", marginLeft: "-15px"}}
                    icon={<ArrowBack />}
                />
            )}
            <div className="title">{title}</div>
            <div className="rightLink">
                <FlatButton
                    onTouchTap={onRightLinkClick}
                    label={rightLink}
                    primary={true}
                    hoverColor= "white"
                    style={{cursor: "pointer", marginRight: "-15px"}}
                />
            </div>
        </div>
    )
}

export default ListNavigationHeader;
