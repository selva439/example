var mongoose = require('mongoose');

var mediaSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    mediaCategory: {
        type: String,
        required: true
    }, 
    mediaName: {
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

mongoose.model('Media', mediaSchema, 'media');