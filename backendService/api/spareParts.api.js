const spareParts = require('../models/spareParts');

//addSparePartAd() function
function addSparePartAd(payload) {
    return new Promise((resolve, reject) => {
        const newSparePart = new spareParts(payload);

        spareParts.save().then((sparepart) => {
            resolve(newSparePart);
        }).catch((err) => {
            reject(err);
        })

    })
}

//getAllSparePartsAds() function
function getAllSparePartsAds() {
    return new Promise((resolve, reject) => {
        spareParts.find().then((docs) => {
            resolve(docs);
        }).catch((err) => {
            reject(err);
        })
    })
}

//getSparePartById() function
function getSparePartById(id) {
    return new Promise((resolve, reject) => {
        spareParts.findById(id).then((docs) => {
            resolve(docs);
        }).catch((err) => {
            reject(err)
        });
    });
}

//updateSparePartById() function
function updateSparePartById(id, payload) {
    return new Promise((resolve, reject) => {
        spareParts.findByIdAndUpdate(id, {$set: payload}).then((docs) => {
            resolve(docs);
        }).catch((err) => {
            reject(err);
        });
    })
}

//deleteSparepartsById() function
function deleteSparepartsById(id){
    return new Promise((resolve, reject) => {
        spareParts.findByIdAndRemove(id).then(() => {
            resolve("Successfully deleted!");
        }).catch((err) => {
            reject(err);
        })
    })
}