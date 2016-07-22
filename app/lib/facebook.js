const loginAsync = () => {
    var me = this;
    return new Promise((resolve, reject) => FB.login((response) => {
        if (response.authResponse) {
            return getUserDetails();
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

export {loginAsync};
export {getUserDetails};