const mongoose  = require('mongoose');

const Schema  = mongoose.Schema;

const userSchema  = new Schema ({
        name : {type : String, required : true},
        email : {type : String, required : true},
        password : {type : String},
        type : {type : String , required :true},
        phoneNumber : {type : Number, required : true},
        wishList:{type:Array}

},{
    timestamps:true
});

const User = mongoose.model('User', userSchema);

module.exports = User;

// User SingUp   page implementation. 
// Backend service to add User details and login.
// User Sign in   page implementation.
// Update User details  page implementation.
// Backend service to update User details.
