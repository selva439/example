var mongoose = require('mongoose');
var Events = mongoose.model('Events');

//Display all existing Events
module.exports.eventsGetAll = function(req, res){
    Events
        .find()
        .exec(function(err, events){
            if(err){
                console.log("Error finding Events");
                res 
                    .status(500)
                    .json(err)
            }
            else {
                console.log("Found Events", events.length);
                res
                    .json(events);
            } 
        });
};

//Search for a specific Event
//Copy from vp.controllers.js 

//Update an existing Events
module.exports.eventsUpdateOne = function(req,res){
    
    var eventsID = req.params.eventsID;
    //FindOne based on MongoDB object ID 
    console.log("GET eventsID", eventsID);
    Events
        .findById(eventsID)
        .exec(function(err, doc){
            var response = {
                status : 200,
                message : doc 
            }; 
            if(err){
                console.log("Error finding Events");
                response.status = 500;
                response.message = err;
            } else if(!doc){
                response.status = 404;
                response.message = { "message" : "Event Not found"} ;
            }
            if (response.status !== 200){
                res
                .status(response.status)
                .json(response.message); 
            } else {
                doc.eventDate = req.body.eventDate;
                doc.program = req.body.program;
                doc.areaName = req.body.areaName;
                doc.boothNo = parseInt(req.body.boothNo, 10);
                doc.managerName = req.body.managerName;
                doc.managerContact = parseInt(req.body.managerContact, 10);
            }
            //save to mongodb with callback function
            doc.save(function(err, eventsUpdated){
               if (err){
                    console.log("Error updating events");
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

//Delete a specific Event
module.exports.eventsDeleteOne = function(req,res){
    
    var eventsID = req.params.eventsID;
    //FindOne based on MongoDB object ID 
    console.log("GET eventsID", eventsID);
    Events
        .findByIdAndRemove(eventsID)
        .exec(function(err, events){
            if(err){
                res
                    .status(404)
                    .json(err);
            } else {
                console.log("Event Removed. ID: ", eventsID);
                res 
                    .status(204)
                    .json();
            }
        });
       
};

//Add a New Event
module.exports.eventsAddOne = function(req,res){
   Events
    .create({
        eventDate : req.body.eventDate,
        program : req.body.program,
        areaName : req.body.areaName,
        boothNo : parseInt(req.body.boothNo, 10),
        managerName : req.body.managerName,
        managerContact : parseInt(req.body.managerContact, 10)
    }, function(err, events){
       if(err){
           console.log("Error creating events" );
           res
            .status(400)
            .json(err);
       }
       else {
            console.log("Event Created" );
            res
             .status(201)
             .json(events);
       }    
    });
};