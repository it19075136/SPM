const Vehicle = require('../models/vehicleModel');

//addVehicleAd() function
function addVehicleAd(payload) {
    return new Promise((resolve, reject) => {
        const newVehicleAd = new Vehicle(payload);

        newVehicleAd.save().then((newVehicle) => {
            resolve(newVehicle);
        }).catch((err) => {
            reject(err);
        })

    })
}

//getAllVehicleAds() function
function getAllVehicleAds() {
    return new Promise((resolve, reject) => {
        Vehicle.find().then((docs) => {
            resolve(docs);
        }).catch((err) => {
            reject(err);
        })
    })
}

//updateVehicleAdById() function
function updateVehicleAdById(id, payload) {
    return new Promise((resolve, reject) => {
        Vehicle.updateOne({ _id: id }, { $set: payload }).then((doc) => {
            Vehicle.findById(id).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err)
            })
        }).catch((err) => {
            reject(err);
        });
    })
}

//getVehicleAdById() function
function getVehicleAdById(id) {
    return new Promise((resolve, reject) => {
        Vehicle.findById(id).then((doc) => {
            resolve(doc);
        }).catch((err) => {
            reject(err);
        });
    })
}

//deleteVehicleAdById() function
function deleteVehicleAdById(id) {
    return new Promise((resolve, reject) => {
        Vehicle.findByIdAndDelete(id).then((doc) => {
            resolve(doc);
        }).catch((err) => {
            reject(err);
        });
    })
}

//getPublishedVehicleAds() function
function getPublishedVehicleAds() {
    return new Promise((resolve, reject) => {
        Vehicle.find({ status: 'published' }, '_id title location price negotiable condition', { sort: { title: 1 } }).then((doc) => {
            resolve(doc);
        }).catch((err) => {
            reject(err);
        });
    })
}

//getPendingVehicleAds() function
function getPendingVehicleAds() {
    return new Promise((resolve, reject) => {
        Vehicle.find({ status: 'pending' }, '_id title updatedAt userId status', { sort: { title: 1 } }).then((doc) => {
            resolve(doc);
        }).catch((err) => {
            reject(err);
        });
    })
}

module.exports = { addVehicleAd, getAllVehicleAds, updateVehicleAdById, getVehicleAdById, deleteVehicleAdById, getPublishedVehicleAds, getPendingVehicleAds }