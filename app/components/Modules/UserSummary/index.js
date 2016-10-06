import React, {PropTypes} from 'react';
import Avatar from 'material-ui/Avatar';
import {formatPhotoURL} from 'lib/facebook'
import {pink500, grey500, cyan200, blue500, blueGrey100, grey300} from 'material-ui/styles/colors'


class UserSummary extends React.Component {

    static propTypes = {
        userName: PropTypes.string,
        userID: PropTypes.string,
        tripsCount: PropTypes.number,
        friendsCount: PropTypes.friends
    }
    render() {
        return (
            <div className="user-summary" style={{height: "150px"}}>
                <div className="top" style={{backgroundColor: pink500, maxHeight: "50px", borderTopRightRadius: "5px", borderTopLeftRadius: "5px"}}></div>
                <div className="bottom" style={{backgroundColor: 'white', borderBottomRightRadius: "5px", borderBottomLeftRadius: "5px"}}>
                    <div className="user-avatar">
                        <img src={formatPhotoURL(this.props.userID, 60)} style={{border: "2px solid white", borderRadius: "5px", position: "absolute", top: "25px", left: "15px"}} />
                        <span style={{fontSize:"19px", fontFamily: 'Roboto', fontWeight: 'bold', position: 'absolute', top: "68px", left: "80px"}}>{this.props.userName}</span>
                        <div className="user-data" style={{fontSize: "13px", position: 'absolute', bottom: '15px', left: "15px"}}>
                            <div className="headers" style={{color: grey500}}>
                                <div>FRIENDS</div>
                                <div>TRIPS</div>
                            </div>
                            <div className="data" style={{fontSize: "18px", color: pink500, fontWeight: 'bold'}}>
                                <div>{this.props.friendsCount || 4}</div>
                                <div>{this.props.tripsCount || 3}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserSummary;
