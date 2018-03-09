var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://venkatesh:testpassword@ds245238.mlab.com:45238/voterpulse';

var _connection = null; 
var open = function(){
    //set_connection
    MongoClient.connect(dburl, function(err, db){
        if(err){
            console.log("DB Connection Failed");
            return;
        }
        _connection = db;
        console.log("DB Connection open", db);
    });
};

var get = function(){
    return _connection;
};

module.exports = {
    open : open, 
    get : get
};