import Express from 'express';
import wrap from 'express-async-wrap'; // can use async, await

const router = new Express.Router();
var trips = [];

router.get('/trips', wrap(async function (req, res) {
    return req.storage.getTrips(req.facebook.user).then(trips => res.json(trips));
}));
router.post('/trips', wrap(async function (req, res) {
    return req.storage.insertTrip(req.facebook.user, req.body).then(() => res.json(req.body));
}));
router.get('/trips/:id', wrap(async function (req, res) {
    return req.storage.getTrip(req.facebook.user, req.params.id).then( trip => res.json(trip));
}));
router.put('/trips/:id', wrap(async function (req, res) {
    return req.storage.updateTrip(req.facebook.user, req.params.id, req.body).then( trip => {
        res.json(trip)
    });
}));
router.delete('/trips/:id', wrap(async function (req, res) {
    trips = trips.filter(t => t.id != req.params.id);
}));

export default router;
