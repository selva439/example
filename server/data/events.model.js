var mongoose = require('mongoose');

var eventsSchema = new mongoose.Schema({
    eventDate: {
        type: String,
        required : true
    },
    program: {
        type: String,
        required: true
    }, 
    areaName: {
        type: String, 
        required : true
    },
    boothNo: {
        type: Number
    },
    managerName: { 
        type: String
    },
    managerContact: { 
        type: Number
    }
}); 

mongoose.model('Events', eventsSchema, 'events');