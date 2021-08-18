const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema ({
    mainName : {type : String, required : true},
    mainDescription : {type : String, required : true},
    childCategory : {type : Array, required : false}
},{
    timestamps : true
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;