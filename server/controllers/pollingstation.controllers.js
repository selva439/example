var mongoose = require('mongoose');
var PollingStation = mongoose.model('PollingStation');
var Area = mongoose.model('Area');

//Get by Limit ID
module.exports.pollingstationGetByLimit = function (req, res) {
    var limitId = req.query.limitId;
    console.log(limitId);
    var query = {limitName: limitId};
    Area
        .find({ limitName: limitId})
        .exec(function (err, doc) {
            console.log(doc);
            res
                .status(200)
                .json(doc);
        });
};


//Get By Area Name
module.exports.pollingstationGetByArea = function (req, res) {
    var areaName = req.query.areaName;
    console.log(areaName);
    PollingStation
        .find({ pollingStationName: areaName})
        .exec(function (err, doc) {
            res
                .status(200)
                .json(doc);
        });
};


//Display all existing pollingstation
module.exports.pollingstationGetAll = function(req, res){
    PollingStation
        .find()
        .exec(function(err, pollingstation){
            if(err){
                console.log("Error finding pollingstation");
                res 
                    .status(500)
                    .json(err)
            }
            else {
                console.log("Found pollingstation", pollingstation.length);
                res
                    .json(pollingstation);
            } 
        });
};

//Search for a specific pollingstation
//Copy from vp.controllers.js 

//Update an existing pollingstation
module.exports.pollingstationUpdateOne = function(req,res){
    
    var pollingstationID = req.params.pollingstationID;
    //FindOne based on MongoDB object ID 
    console.log("GET pollingstationID", pollingstationID);
    PollingStation
        .findById(pollingstationID)
        .exec(function(err, doc){
            var response = {
                status : 200,
                message : doc 
            }; 
            if(err){
                console.log("Error finding pollingstation");
                response.status = 500;
                response.message = err;
            } else if(!doc){
                response.status = 404;
                response.message = { "message" : "pollingstation record Not found"} ;
            }
            if (response.status !== 200){
                res
                .status(response.status)
                .json(response.message); 
            } else {
                doc.acID = parseInt(req.body.acID, 10);
                doc.lmID = parseInt(req.body.lmID, 10);
                doc.arName = req.body.arName;
                doc.psID = parseInt(req.body.psID, 10);
                doc.psLocation = req.body.psLocation;
                doc.psAddress = req.body.psAddress;
                doc.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
            }
            //save to mongodb with callback function
            doc.save(function(err, pollingstationUpdated){
               if (err){
                    console.log("Error updating pollingstation");
                    res 
                        .status(500)
                        .json(err);
               } else {
                    res
                       .status(204)
                       .json()
                }
            });
            });
        
};

//Delete a specific pollingstation
module.exports.pollingstationDeleteOne = function(req,res){
    
    var pollingstationID = req.params.pollingstationID;
    //FindOne based on MongoDB object ID 
    console.log("GET pollingstationID", pollingstationID);
    PollingStation
        .findByIdAndRemove(pollingstationID)
        .exec(function(err, pollingstation){
            if(err){
                res
                    .status(404)
                    .json(err);
            } else {
                console.log("pollingstation Removed. ID: ", pollingstationID);
                res 
                    .status(204)
                    .json();
            }
        });
       
};

//Add a New pollingstation 
module.exports.pollingstationAddOne = function(req,res){
   PollingStation
    .create({
        acID : parseInt(req.body.acID, 10),
        lmID : parseInt(req.body.lmID, 10),
        arName : req.body.arName,
        psID : parseInt(req.body.psID, 10),
        psLocation : req.body.psLocation,
        psAddress : req.body.psAddress,
        coordinates : [ parseFloat(req.body.lng), parseFloat(req.body.lat)],
    }, function(err, pollingstation){
       if(err){
           console.log("Error creating pollingstation" );
           res
            .status(400)
            .json(err);
       }
       else {
            console.log("pollingstation Created" );
            res
             .status(201)
             .json(pollingstation);
       }    
    });
};

module.exports.pollingstationGetOne = function(req,res){    
    var pollingstationID = req.params.pollingstationID;
    //FindOne based on MongoDB object ID 
    PollingStation
        .findById(pollingstationID)
        .exec(function(err, doc){
            res 
                .status(200)
                .json(doc);
            });
};