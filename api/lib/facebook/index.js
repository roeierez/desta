
export const syncFriends = (req, res, next) => {
    let facebook = req.facebook;
    facebook.api('/me/friends', (err, friends) => {
        console.log(friends);
        next();
    })
}