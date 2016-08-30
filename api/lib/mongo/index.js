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
        return db.collection('users').find({facebookID}, {access_token: 1, facebookID: 1}).toArray()
            .then(res => res[0]);
    },

    setAccessToken: function(facebookID, access_token) {
        return db.collection('users').update({facebookID}, {$set: {facebookID, access_token}}, {upsert: true});
    },

    setUserFriends: function(facebookID, friends) {
        return db.collection('users').update({facebookID}, {$set: {friends}}, {upsert: true});
    },

    getTrips: function(facebookID){
        return db.collection('users').find({facebookID}, {trips: 1, facebookID: 1}).toArray()
            .then(res => {
                return res[0] && res[0].trips && res[0].trips.map(t => (Object.assign(t, {owner: res[0].facebookID})));
            }, err => {
                return Promise.reject(err);
            });
    },

    insertTrip: function(facebookID, trip){
        trip.id = new ObjectID().toString();
        return db.collection('users').update({facebookID}, {$push:{trips: trip}}, {upsert: true});
    },

    updateTrip: function(facebookID, tripID, trip){
        var $set = {},
            me = this;

        Object.keys(trip).forEach(k => {
            $set["trips.$." + k] = trip[k];
        });

        return db.collection('users').update({facebookID, "trips.id": tripID}, {$set})
            .then(r => me.getTrip(facebookID, tripID));
    },

    getTrip: function(facebookID, tripID) {
        let condition = {
            trips: {
                $elemMatch: {
                    $or:[
                        {id: tripID},
                        {link: `/profile/trips/${tripID}`}
                    ]
                }
            }
        }
        return db.collection('users').find(condition, {"trips.$":1, facebookID: 1}).toArray()
        //return db.collection('users').find({facebookID, ...{$or}}, {"trips.$":1}).toArray()
            .then(result => {
                let user = result && result[0],
                    trip = user && user.trips && user.trips[0];
                if (trip) {
                    trip.owner = user.facebookID;
                }

                return trip || null;
            });
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
