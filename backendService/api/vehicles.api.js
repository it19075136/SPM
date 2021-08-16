const Vehcile = require('../models/vehicleModel');

//addVehicleAd() function
function addVehicleAd(payload) {
    return new Promise((resolve, reject) => {
        const newVehicleAd = new Vehcile(payload);

        newVehicleAd.save().then((newVehicle) => {
            resolve(newVehicle);
        }).catch((err) => {
            resolve(err);
        })

    })
}

//getAllVehicleAds() function
function getAllVehicleAds() {
    return new Promise((resolve, reject) => {
        Vehcile.find().then((docs) => {
            resolve(docs);
        }).catch((err) => {
            resolve(err);
        })
    })
}

//updateVehicleAdById() function
function updateVehicleAdById(id, payload) {
    return new Promise((resolve, reject) => {
        Vehcile.findByIdAndUpdate(id, {$set: payload}).then((docs) => {
            resolve(docs);
        }).catch((err) => {
            resolve(err);
        });
    })
}

module.exports = { addVehicleAd,getAllVehicleAds,updateVehicleAdById }