import {Facebook, FacebookApiException} from 'fb';
import Express from 'express';
import wrap from 'express-async-wrap'; // can use async, await
import moment from 'moment';
const router = new Express.Router();
const isProduction = process.env.NODE_ENV == 'production';

const syncFriends = async (req, res, next) => {
    next();
    let fbAPI = req.facebook.api;
    if (!req.user.last_friends_sync || moment().diff( moment(req.user.last_friends_sync), 'hours') > 1 ) {
        let res = await fbAPI.apiPromise('/me/friends')
        req.storage.setUserFriends(req.user.facebookID, res.data);
        console.log(res);
    }
}

const ensureSignedRequest = async (req, res, next) => {
    var cookieName = `fbsr_${ isProduction ? '280958242271322' : '289224691444677'}`,
        cookie = req.cookies[cookieName],
        storage = req.storage,
        facebook = new Facebook({appSecret: isProduction ? '7e10754c21b67603eeb19dea900d1d07' : 'e2b4625345691924797bfc495078fbc4'});

    facebook.apiPromise = function(){
        var invokePromise = (retry) => {
            return new Promise((resolve, reject) => {
                let args = Array.prototype.slice.call(arguments);
                args.push(async function(res){
                    try {
                        if (res && res.error && res.error.code == 190 && !retry) {
                            let accessToken = await requestAccessToken(facebook, req.facebook.signedRequest);
                            await storage.setAccessToken(req.user.facebookID, accessToken);
                            req.user.access_token = accessToken;
                            facebook.setAccessToken(accessToken);
                            let retryResult = await invokePromise(true);
                            resolve(retryResult);
                        }

                        if (!res || res.error) {
                            console.log(!res ? 'error occurred' : res.error);
                            reject(res && res.error);
                        } else {
                            resolve(res);
                        }
                    } catch(error) {
                        reject(error);
                    }
                });

                facebook.api.apply(facebook, args);
            });
        }

        return invokePromise();

    };

    if (cookie) {
        var parsed = facebook.parseSignedRequest(cookie, isProduction ? '7e10754c21b67603eeb19dea900d1d07' : 'e2b4625345691924797bfc495078fbc4');
        req.facebook = {api: facebook, signedRequest: parsed};
    }

    if (!req.facebook) {
        res.status(401).send("User must authenticate");
    } else {
        next();
    }
}

const ensureUser = async (req, res, next) => {
    let storage = req.storage,
        user = await storage.getUser(req.facebook.signedRequest.user_id);

    req.user = user;
    next();
}

const ensureAccessToken = async(req, res, next) => {
    var storage = req.storage,
        user = req.user;

    if (user.access_token) {
        req.facebook.api.setAccessToken(user.access_token);
        next();
    } else {
        var token = await requestAccessToken(req.facebook.api, req.facebook.signedRequest)
        req.facebook.api.setAccessToken(token);
        req.user.access_token = token;
        return await storage.setAccessToken(req.user.facebookID, token);
    }
}

const requestAccessToken = async (fbAPI, user) => {

    let res = await fbAPI.apiPromise('oauth/access_token', {
        client_id: isProduction ? '280958242271322' : '289224691444677',
        client_secret: isProduction ? '7e10754c21b67603eeb19dea900d1d07' : 'e2b4625345691924797bfc495078fbc4',
        redirect_uri: '',
        code: user.code
    });
    return res.access_token;
}

router.use(wrap(ensureSignedRequest));
router.use(wrap(ensureUser));
router.use(wrap(ensureAccessToken));
router.use(syncFriends);

export default router;