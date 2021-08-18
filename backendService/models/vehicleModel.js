const mongoose  = require('mongoose');

const Schema  = mongoose.Schema;

// Vehicle ads schema
const vehicleSchema  = new Schema ({
        title : {type : String, required : true},
        description : {type : String},
        status : {type : String, required : true},
        year : {type: Date, required: true},
        make : {type : String, required : true},
        model : {type : String , required :true},
        category : {type : Number, required : true},
        condition : {type : Number, required : true},
        engineCapacity: {type: String, required : true },    
        price: {type: Number},
        negotiable:{type: Boolean},
        imageUrls:{type: Array,required: true},
        userId:{type: String,required: true},
        contactNumbers: {type: Array,required: true}
},{
    timestamps:true
});

module.exports = Vehicle = mongoose.model('Vehicle', vehicleSchema);