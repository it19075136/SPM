const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema ({
    make : {type : Array, required : false},
    type : {type : String, required : true},
    images : {type : Array, required: false},
    mainName : {type : String, required : true},
    mainDescription : {type : String, required : true},
    // childCategory : {type : Array, required : false}
},{
    timestamps : true
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;