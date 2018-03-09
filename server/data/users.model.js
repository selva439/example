var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    phone: {
        type: Number,
        required : true
    },
    password: {
        type: String,
        required: true
    }, 
    role: {
        leader: String, 
        id : Number,
        rname : String
    }
}); 

mongoose.model('Users', usersSchema, 'users');
