var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

var db = null;
function connect() {
    return new Promise((resolve, reject) => {
        mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
            if (err) {
                reject(err);
            } else {
                db = database;
                resolve(storage);
            }
        });
    })
}

var storage = {

    getUser: function(facebookID) {
        return db.collection('users').find({facebookID}, {access_token: 1, facebookID: 1, last_friends_sync: 1, name: 1}).toArray()
            .then(res => res[0]);
    },

    updateUser: function(facebookID, props) {
        return db.collection('users').update({facebookID}, {$set: props});
    },

    isFriendOfMine: async function(me, him) {
        let count = await db.collection('users').count({facebookID: me, friends: {$elemMatch: {id: him}} });
        return count == 1;
    },

    setAccessToken: function(facebookID, access_token) {
        return db.collection('users').update({facebookID}, {$set: {facebookID, access_token}}, {upsert: true});
    },

    setUserFriends: function(facebookID, friends) {
        return db.collection('users').update({facebookID}, {$set: {friends}, $currentDate: { last_friends_sync: true} }, {upsert: true});
    },

    getProfile: function(facebookID, withFriends=false){
        let projection = {trips: 1, facebookID: 1, name: 1},
            me = this;

        if (withFriends) {
            projection.friends = 1;
        }
        return db.collection('users').find({facebookID}, projection).toArray()
            .then(res => {
                let user = res[0];
                return me.getTrips(user).then(trips => {
                    user.trips = trips;
                    return user;
                })
            }, err => {
                return Promise.reject(err);
            });
    },

    getProfiles: function( facebookIDs) {
        return db.collection('users').find({facebookID: {$in: facebookIDs}}, {trips: 1, facebookID: 1, name: 1}).toArray()
            .then(res => {
                return res;
            }, err => {
                return Promise.reject(err);
            });
    },

    insertTrip: function(facebookID, trip){
        let me = this;

        console.error('insert trip');
        trip.ownerID = facebookID;
        return db.collection('trips').insert(trip)
            .then((result) => {
                let newTrip = result.ops && result.ops[0];
                if (newTrip) {
                    console.error("got new trip id = " + newTrip._id.toString());
                    return me.getTrip(facebookID, newTrip._id.toString());
                }
                return newTrip;
            })
    },

    updateTrip: function(facebookID, tripID, trip){
        console.error('update trip');
        let me = this;
        delete trip._id;
        return db.collection('trips').update({ownerID: facebookID, _id: ObjectID(tripID)}, {$set: trip})
            .then(result => {
                return me.getTrip(facebookID, tripID);
            });
    },

    deleteTrip: function(facebookID, tripID) {
        return db.collection('trips').remove({ownerID: facebookID, _id: ObjectID(tripID)});
    },

    getTrips: function(user, limit = 100) {
        return db.collection('trips').find({ownerID: user.facebookID}, {limit}).toArray()
            .then(trips => {
                return trips.map(t => {
                    return Object.assign(t, {id: t._id, owner: {name: user.name, id: user.facebookID}});
                });
            })
    },

    getTrip: function(facebookID, tripID) {

        let me = this;

        console.error('getTrip');
        return db.collection('trips').find({ownerID: facebookID, _id: ObjectID(tripID)}).toArray()
            .then(trips => {
                return me.getUser(facebookID)
                    .then(user => {
                        console.error('got user');
                        let trip = trips && trips[0];
                        if (trip) {
                            console.error('getTrip found trip ' + JSON.stringify(trip));
                            trip.id = trip._id.toString();
                            console.error('getTrip found trip after id ' + JSON.stringify(trip));
                            trip.owner = {facebookID: user.facebookID, name: user.name};
                        }
                        return trip;
                    })
            })
    },

    insertLink: function(generatedLink, link) {
        return db.collection('links').update({generatedLink}, {link}, {upsert: true});
    },

    getLink: function(generatedLink) {
        return db.collection('links').find({generatedLink}).toArray().then(result => {
            return result && result[0] && result[0].link;
        });
    }
}

module.exports = connect;
