const loginAsync = (silent) => {
    var me = this;
    return init()
        .then(user => {
            if (user) {
                return user;
            }

            if (silent && !user) {
                return null;
            }

            return new Promise((resolve, reject) => FB.login((response) => {
                if (response.authResponse) {
                    return getUserDetails().then(user => {
                        initPromise = Promise.resolve(user);
                        resolve(user);
                    }, reject);
                } else {
                    reject();
                }

            }, {scope: 'user_friends,user_posts', return_scopes: true}));
        })
}

const logoutAsync = () => {
    return new Promise((resolve, reject) => {
        FB.logout(function(response) {
            resolve();
        });
    })
}

const getUserDetails = () => {
    return new Promise((resolve, reject) => {
        FB.api('/me', function (response) {
            if (response && response.name) {
                resolve(response);
            } else {
                reject();
            }
        });
    });
}

const getLoginStatus = () => {
    return new Promise((resolve, reject) => {
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                resolve({id: response.authResponse.userID});
            } else {
                resolve();
            }
        });
    })
}

const getFriendsAsync = () => {
    return new Promise( (resolve, reject) => {
        FB.api('/me/friends', function (response) {
            if (response && response.data) {
                resolve(response.data);
            } else {
                reject();
            }
        });
    });
}

const formatPhotoURL = (id, size) => {
    return `https://graph.facebook.com/v2.7/${id}/picture?type=small&width=${size}&height=${size}`;
}

const getFriendsLocationsHistory = () => {
    return getFriendsAsync()
        .then(friends => {
            if (!friends || friends.length == 0) {
                return [];
            }

            let requests = friends.map( f => {
                return {
                    method: 'GET',
                    relative_url: `${f.id}/feed?with=location&fields=place,created_time`
                }
            })
            return api('/', 'POST', {
                batch: requests
            })
                .then(friendsResponses => {

                    let friendsLocations = [];
                    friendsResponses.forEach((fr,i) => {
                        if (fr.code == 200) {
                            let body = JSON.parse(fr.body);
                            if (body.data && body.data.length > 0) {
                                body.data.forEach(data => {
                                    if (data.place.location) {
                                        friendsLocations.push({
                                            created_time: data.created_time,
                                            user: {...friends[i], photo: formatPhotoURL(friends[i].id, 45)},
                                            place: data.place,
                                            location: {lat: data.place.location.latitude, lng: data.place.location.longitude},
                                            title: friends[i].name,
                                            label: friends[i].name
                                        })
                                }
                                });
                            }
                        }
                    });

                    return friendsLocations;

                    // return [
                    //     {
                    //         user: {
                    //             id: '123',
                    //             name: 'Gal Erez',
                    //             photo: formatPhotoURL('10154285576534477', 30)
                    //         },
                    //         location: {
                    //             lat: -25.363882, lng: 131.044922
                    //         }
                    //     },
                    //     {
                    //         user: {
                    //             id: '1223',
                    //             name: 'Gal2 Erez',
                    //             photo: formatPhotoURL('10154285576534477', 30)
                    //         },
                    //         location: {
                    //             lat: -25.363882, lng: 90.044922
                    //         }
                    //     }
                    // ];
                })

        })
}

const api = (...args) => {
    //var args = Array.prototype.slice.call(arguments);
    return new Promise((resolve, reject) => {
        args.push(function(response){
            if (response.length != null) {
                resolve(response);
                return;
            }
            if (response && response.body) {
                resolve(response.body);
            } else if (response && response.data) {
                resolve(response.data);
            } else {
                reject();
            }
        });
        FB.api.apply(FB, args)
    });
}

let initPromise = null;
const init = () => {
    if (!initPromise) {
        if (window.FB) {
            initPromise = getLoginStatus();
        }

        initPromise = new Promise((resolve, reject) => {
            window.fbAsyncInit = function () {
                FB.init({
                    appId: window.location.hostname == 'test.robustico.com' ? '289224691444677' : '280958242271322',
                    xfbml: true,
                    cookie: true,
                    version: 'v2.7'
                });
                getLoginStatus().then(resolve, () => resolve(null));
                // FB.Event.subscribe('auth.logout',function(){alert('logged out')});
                // FB.Event.subscribe('auth.login',function(){alert('logged in')});
            };

            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {
                    return;
                }
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        });
    }
    return initPromise;
}

export {loginAsync};
export {logoutAsync};
export {getFriendsAsync};
export {getUserDetails};
export {init};
export {getFriendsLocationsHistory}
export {formatPhotoURL}