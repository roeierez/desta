import {Facebook, FacebookApiException} from 'fb';
import Express from 'express';
import wrap from 'express-async-wrap'; // can use async, await
import moment from 'moment';
const router = new Express.Router();

const syncFriends = (req, res, next) => {
    let fbAPI = req.facebook.api;
    if (!req.user.last_friends_sync || moment().diff( moment(req.user.last_friends_sync), 'hours') > 1 ) {
        fbAPI.apiPromise('/me/friends')
            .then(res => {
                req.storage.setUserFriends(req.user.facebookID, res.data);
                console.log(res);
            })
    }
    next();
}

const ensureSignedRequest = async (req, res, next) => {
    var cookieName = 'fbsr_289224691444677',
        cookie = req.cookies[cookieName],
        facebook = new Facebook({appSecret: 'e2b4625345691924797bfc495078fbc4'});

    facebook.apiPromise = function(){
        return new Promise((resolve, reject) => {
            let args = Array.prototype.slice.call(arguments);
            args.push(function(res){
                if(!res || res.error) {
                    console.log(!res ? 'error occurred' : res.error);
                    reject(res && res.error);
                } else {
                    resolve(res);
                }
            })
            facebook.api.apply(facebook, args);
        });
    };

    if (cookie) {
        var parsed = facebook.parseSignedRequest(cookie, 'e2b4625345691924797bfc495078fbc4');
        req.facebook = {api: facebook, signedRequest: parsed};
    }

    if (!req.facebook) {
        res.status(401).send("User must authenticate");
    } else {
        next();
    }
}

const ensureUser = async (req, res, next) => {
    var storage = req.storage;
    return storage.getUser(req.facebook.signedRequest.user_id)
        .then(user => {
            req.user = user;
            next();
        })
}

const ensureAccessToken = async(req, res, next) => {
    var storage = req.storage,
        user = req.user;

    if (user.access_token) {
        req.facebook.api.setAccessToken(user.access_token);
        next();
    } else {
        return requestAccessToken(req.facebook.api, req.facebook.signedRequest)
            .then(token => {
                req.facebook.api.setAccessToken(token);
                req.user.access_token = token;
                return storage.setAccessToken(req.user.facebookID, token);
            })
    }
}

const requestAccessToken = (fbAPI, user) => {

    return fbAPI.apiPromise('oauth/access_token', {
        client_id: '289224691444677',
        client_secret: 'e2b4625345691924797bfc495078fbc4',
        redirect_uri: '',
        code: user.code
    }).then(res => {
        return res.access_token;
    })
}

router.use(wrap(ensureSignedRequest));
router.use(wrap(ensureUser));
router.use(wrap(ensureAccessToken));
router.use(syncFriends);

export default router;
