const mongoose = require('mongoose');
const schema = mongoose.Schema;

const documentSchema = new schema({
    userId:{
        type:String,
        require:true
    },
    activityId:{
        type:String,
        require:true
    },
    type:{
        type:String,
        require:true
    },
    status:{
        type:String,
        require:true
    },  
    fileUrl:{
        type:String,
        require:true
    }
},{
    timestamps: true
})

module.exports =document= mongoose.model('document',documentSchema);
