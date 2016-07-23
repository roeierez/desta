const loginAsync = () => {
    var me = this;
    return new Promise((resolve, reject) => FB.login((response) => {
        if (response.authResponse) {
            return getUserDetails().then(resolve, reject);
        } else {
            reject();
        }

    }));
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

const init = () => {
    if (window.FB) {
        return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '280958242271322',
                xfbml      : true,
                cookie: true,
                version    : 'v2.7'
            });
            resolve();
            // FB.Event.subscribe('auth.logout',function(){alert('logged out')});
            // FB.Event.subscribe('auth.login',function(){alert('logged in')});
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    });
}

export {loginAsync};
export {getUserDetails};
export {init};