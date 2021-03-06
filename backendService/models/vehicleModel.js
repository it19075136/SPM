const mongoose  = require('mongoose');

const Schema  = mongoose.Schema;

// Vehicle ads schema
const vehicleSchema  = new Schema ({
        title : {type : String, required : true},
        description : {type : String},
        status : {type : String, required : true},
        year : {type: String, required: true},
        make : {type : String, required : true},
        model : {type : String},
        location: {type : String, required : true},  
        category : {type : String, required : true},
        bodyType : {type : String},
        condition : {type : String, required : true},
        engineCapacity: {type: Number, required : true },    
        transmission: {type: String, required : true },    
        fuelType: {type: String, required : true },    
        mileage: {type: String, required : true },    
        price: {type: Number},
        negotiable:{type: Boolean, default: false},
        images:{type: Array,required: true},
        userId:{type: String,required: true},
        contactNumbers: {type: Array,required: true}
},{
    timestamps:true
});

module.exports = Vehicle = mongoose.model('Vehicle', vehicleSchema);