import Express from 'express';
import generateLink from '../lib/linkGenerator';
import wrap from 'express-async-wrap'; // can use async, await

const router = new Express.Router();
var trips = [];

router.get('/', wrap(async function (req, res, next) {
    return req.storage.getTrips(req.facebook.user).then(trips => res.json(trips), e => {
        next(e);
    })
}));
router.post('/', wrap(async function (req, res) {
    return req.storage.insertTrip(req.facebook.user, req.body).then(() => res.json(req.body));
}));
router.get('/:id', wrap(async function (req, res) {
    return req.storage.getTrip(req.facebook.user, req.params.id).then( trip => {
        res.json(trip);
    });
}));
router.put('/:id', wrap(async function (req, res) {
    return req.storage.updateTrip(req.facebook.user, req.params.id, req.body).then( trip => {
        res.json(trip)
    });
}));
router.get('/:id/generateLink', wrap(async function (req, res) {
    var link = `/profile/trips/${generateLink()}`;
    return req.storage.updateTrip(req.facebook.user, req.params.id, {link}).then(() => res.json({link}));
}));
router.delete('/:id', wrap(async function (req, res) {
    trips = trips.filter(t => t.id != req.params.id);
}));

export default router;
