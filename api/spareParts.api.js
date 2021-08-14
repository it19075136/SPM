const spareParts = require('../models/spareParts');


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
// function updateSparePartById(id, payload) {
//     return new Promise((resolve, reject) => {
//         if(payload)
//     })
// }