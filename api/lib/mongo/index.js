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
    getTrips: function(facebookID){
        return db.collection('users').find({facebookID}, {trips: 1}).toArray()
            .then(res => res[0] && res[0].trips);
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
        return db.collection('users').find({facebookID}, {trips: {$elemMatch: {id: tripID}}}).toArray()
            .then(result => {
                return result && result[0] && result[0].trips && result[0].trips[0] || null;
            });
    }
}

module.exports = connect;
