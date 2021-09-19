const spareParts = require('../models/spareParts');

//addSparePartAd() function
function addSparePartAd(payload) {
    return new Promise((resolve, reject) => {
        const newSparePart = new spareParts(payload);

        newSparePart.save().then((sparepart) => {
            resolve(sparepart);
        }).catch((err) => {
            resolve(err);
        })

    })
}

//getAllSparePartsAds() function
function getAllSparePartsAds() {
    return new Promise((resolve, reject) => {
        spareParts.find().then((docs) => {
            resolve(docs);
        }).catch((err) => {
            resolve(err);
        })
    })
}

//getSparePartById() function
function getSparePartById(id) {
    return new Promise((resolve, reject) => {
        spareParts.findById(id).then((docs) => {
            resolve(docs);
        }).catch((err) => {
            resolve(err)
        });
    });
}

//updateSparePartById() function
function updateSparePartById(id, payload) {
    return new Promise((resolve, reject) => {
        spareParts.findByIdAndUpdate(id, {$set: payload}).then((docs) => {
            resolve(docs);
        }).catch((err) => {
            resolve(err);
        });
    })
}

//deleteSparepartsById() function
function deleteSparepartsById(id){
    return new Promise((resolve, reject) => {
        spareParts.findByIdAndRemove(id).then(() => {
            resolve("Successfully deleted!");
        }).catch((err) => {
            resolve(err);
        })
    })
}

//getPublishedSparepartsAds() function
function getPublishedSparepartsAds() {
    return new Promise((resolve, reject) => {
        spareParts.find({ status: 'published' }, '_id title location price negotiable', { sort: { title: 1 } }).then((doc) => {
            resolve(doc);
        }).catch((err) => {
            reject(err);
        });
    })
}

//getPendingSparepartsAds() function
function getPendingSparepartsAds() {
    return new Promise((resolve, reject) => {
        spareParts.find({ status: 'pending' }, '_id title updatedAt userId status', { sort: { title: 1 } }).then((doc) => {
            resolve(doc);
        }).catch((err) => {
            reject(err);
        });
    })
}

module.exports = {addSparePartAd, getAllSparePartsAds, getSparePartById, updateSparePartById, deleteSparepartsById, getPublishedSparepartsAds, getPendingSparepartsAds }
