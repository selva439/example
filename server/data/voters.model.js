var mongoose = require('mongoose');

var votersSchema = new mongoose.Schema ({
    id : {
        type : Number
    },
    sno : {
        type : Number
    },
    parlmentConstituencyId : {
        type : Number, 
        required : true
    },
    parlmentConstituencyName : {
        type : String,
        required : true
    },
    assemblyConstituencyId : {
        type : Number,
        required : true
    }, 
    assemblyConstituencyName : {
        type: String, 
        required : true
    },
    pollingStationId : { 
        type : Number,
        required : true
    }, 
    pollingStationName : { 
        type : String,
        required : true
    }, 
    pollingStationLimits : {
        type : String,
        required : true 
    },
    pollingStationLocation : { 
        type : String, 
        required : true
    },
    IDNO : {
        type : String,
        required : true
    },
    name : { 
        type : String,
        required : true
    }, 
    fatherMotherHusand : {
        type : String,
        required : true
    }, 
    hno : {
        type : String
    }, 
    age : {
        type : Number,
        required : true
    }, 
    sex : { 
        type : String,
        required : true
    }, 
    casteType : {
        type : String,
        required : true
    }, 
    caste : {
        type : String, 
        required : true
    }, 
    occupation : {
        type : String, 
        required : true
    },
    leader : { 
        type : String, 
        enum : ['A', 'B', 'C', 'D', 'E', 'A+'],
    }, 
    designation : {
        type : String
    }, 
    mobileNumber : { 
        type : Number, 
        required : true
    }, 
    currentResident : { 
        type : String, 
        enum : ['Yes', 'No'],
        required : true
    }, 
    outOfStation : {
        type : String
    }, 
    boothAgent : { 
        type : String, 
        enum : ['Yes', 'No']
    }, 
    favorTo : { 
        type : String
    }, 
    wardIssues : {
        type : String
    }

});

mongoose.model('Voters', votersSchema, 'voters');