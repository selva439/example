var mongoose = require('mongoose');

var officersSchema = new mongoose.Schema({
    id : {
        type : Number
    },
    name: {
        type: String,
        required : true
    },
    designation: {
        type: String,
        required: true
    }, 
    department: {
        type: String, 
        required : true
    },
    contactNumber: {
        type: Number,
        required : true
    },
    emailId : { 
        type: String
    }
}); 

mongoose.model('Officers', officersSchema, 'officers');
