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

function getCategoryById(id){
    return new Promise((resolve,reject) => {
        Category.findById(id).then((docs) => {
            resolve(docs)
        }).catch((err) => {
            resolve(err)
        })
    })
}

function updateCategoryById(id,values){
    return new Promise((resolve,reject) => {
        Category.findByIdAndUpdate(id, {$set:values}).then((docs) => {
            resolve(docs)
        }).catch((err) => {
            resolve(err);
        })
    })
}

function deleteCategoryById(id){
    return new Promise((resolve,reject) => {
        Category.findByIdAndDelete(id).then((result) => {
            resolve(`Successfully Deleted ${result.mainName}`);
        }).catch((err) => {
            resolve(err);
        })
    })
    
}



module.exports = {addCategory,getAllCategories,getCategoryById,updateCategoryById,deleteCategoryById}