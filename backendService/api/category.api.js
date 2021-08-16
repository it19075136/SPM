const Category = require('../models/categoryModal');

function addCategory(payload){
    return new Promise((resolve,reject) => {
        const newCategory = new Category(payload);

        newCategory.save().then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        })
    })
}

function getAllCategories(){
    return new Promise((resolve,reject) => {
        Category.find((err, docs) => {
            if(err){
                reject(err)
            }else{
                resolve(docs);
            }
        });
    });
}

module.exports = {addCategory,getAllCategories}