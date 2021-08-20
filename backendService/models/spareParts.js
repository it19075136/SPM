const mongoose =require('mongoose');
const Schema = mongoose.Schema;

//---Vehicle Spare Parts Schema---//
const sparePartsSchema = new Schema({
    condition: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 200
    },
    price: {
        type: Number
    },
    negotiable:{ 
        type: Boolean
    },
    images:{
        type: Array,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    contactNumbers: {
        type: Array,
        required: true
    },
    status: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const spareParts = mongoose.model('spareParts', sparePartsSchema);
module.exports = spareParts;