import Express from 'express';
import generateLink from '../lib/linkGenerator';
import wrap from 'express-async-wrap'; // can use async, await

const router = new Express.Router();

router.get('/', wrap(async function (req, res, next) {
    let owner = req.query.owner || req.user.facebookID,
        viewerIsOwner = ( owner == req.user.facebookID ),
        notAllowedAudience = ['private'];

    let profile = await req.storage.getProfile(owner);
    if (!profile.trips) {
        profile.trips = [];
    }
    if (!viewerIsOwner) {
        let isFriend = await req.storage.isFriendOfMine(req.user.facebookID, owner);
        if (!isFriend) {
            notAllowedAudience.push('friends');
        }
        profile.trips = profile.trips.filter( t => {
            return notAllowedAudience.indexOf(t.shareAudience) < 0;
        });
    }

    profile.trips.forEach(t => {
        t.owner = {facebookID: profile.facebookID, name: profile.name};
    });
    res.json(profile);
}));

router.post('/', wrap(async function (req, res) {
    return req.storage.insertTrip(req.user.facebookID, req.body).then(() => res.json(req.body));
}));

router.get('/:id', wrap(async function (req, res) {
    return req.storage.getTrip(req.user.facebookID, req.params.id).then( trip => {
        res.json(trip);
    });
}));
router.put('/:id', wrap(async function (req, res) {
    return req.storage.updateTrip(req.user.facebookID, req.params.id, req.body).then( trip => {
        res.json(trip)
    });
}));
router.get('/:id/generateLink', wrap(async function (req, res) {
    var link = `/profile/trips/${generateLink()}`;
    return req.storage.updateTrip(req.user.facebookID, req.params.id, {link}).then(() => res.json({link}));
}));
router.delete('/:id', wrap(async function (req, res) {
    trips = trips.filter(t => t.id != req.params.id);
}));

export default router;
