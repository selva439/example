//This Model contains all the Schemas under Constituencies. 
//Parliment -> Assembly -> Limits -> Areas -> Polling Stations

var mongoose = require('mongoose');

//Parliment Schema 
var parlimentSchema = new mongoose.Schema({

    parlmentConstituencyId : {
        type: Number,
        required: true,
        unique: true        
    }, 
    parlmentConstituencyName: {
        type: String,
        required: true
    }
});

//Assembly Schema 
var assemblySchema = new mongoose.Schema({

    pcId: {
        type : Number
    },

    assemblyConstituencyId : {
        type: Number,
        required: true,
        unique: true        
    }, 
    assemblyConstituencyName    : {
        type: String,
        required: true
    }
});

//Limits Schema
var limitsSchema = new mongoose.Schema({
      
    constitutionId: {
        type : Number
    },

    id : {
        type: Number,
        required: true
        //unique: true -- flag Venkatesh        
    }, 
    name: {
        type: String,
        required: true
    }
});

//Areas Schema 
var areaSchema = new mongoose.Schema({
    id: {
    type: Number
    }, 
    limitId: {
    type : Number
    },
    limitName: {
    type : String
    },
    name: {
    type: String,
    required: true
    }
    });

//Polling Station Schema 
//Polling Station Schema 
var pollingstationSchema = new mongoose.Schema({
    acId : { 
        type: Number
    },
    limitId : { 
        type: Number
    },
    limitName : {
        type : String
    },
    pollingStationName : {
        type : String
    },
    pollingStationNameId : {
        type : Number
    },
    pollingStationLocation : { 
        type : String
    },
    pollingStationAddress : {
        type : String
    },
    lat : { 
        type : Number
    },
    lon : {
        type : Number
    } 
});
mongoose.model('Parliment', parlimentSchema, 'parlimentconstituencies');
mongoose.model('Assembly', assemblySchema, 'assemblyconstituencies');
mongoose.model('Limits', limitsSchema, 'limits');
mongoose.model('Area', areaSchema, 'areas');
mongoose.model('PollingStation', pollingstationSchema, 'pollingstations');
