const spareParts = require('../models/spareParts');

//addSparePartAd() function
function addSparePartAd(payload) {
    return new Promise((resolve, reject) => {
        const newSparePart = new spareParts(payload);

        newSparePart.save().then((sparepart) => {
            resolve(sparepart);
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
        spareParts.updateOne({_id: id}, {$set: payload}).then((docs) => {
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

module.exports = {addSparePartAd, getAllSparePartsAds, getSparePartById, updateSparePartById, deleteSparepartsById, getPublishedSparepartsAds }