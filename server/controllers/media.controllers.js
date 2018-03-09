var mongoose = require('mongoose');
var Media = mongoose.model('Media');

//Display all existing Media Officials
module.exports.mediaGetAll = function(req, res){
    Media
        .find()
        .exec(function(err, media){
            if(err){
                console.log("Error finding Media officials");
                res 
                    .status(500)
                    .json(err)
            }
            else {
                console.log("Found Media Officials", media.length);
                res
                    .json(media);
            } 
        });
};

//Search for a specific Media Official
//Copy from vp.controllers.js 

//Update an existing Media Official
module.exports.mediaUpdateOne = function(req,res){
    
    var mediaID = req.params.mediaID;
    //FindOne based on MongoDB object ID 
    console.log("GET mediaID", mediaID);
    Media
        .findById(mediaID)
        .exec(function(err, doc){
            var response = {
                status : 200,
                message : doc 
            }; 
            if(err){
                console.log("Error finding Media Official");
                response.status = 500;
                response.message = err;
            } else if(!doc){
                response.status = 404;
                response.message = { "message" : "MOfficial record Not found"} ;
            }
            if (response.status !== 200){
                res
                .status(response.status)
                .json(response.message); 
            } else {
                doc.name = req.body.name;
                doc.mediaCategory = req.body.mediatype;
                doc.mediaName = req.body.medianame;
                doc.contactNumber = parseInt(req.body.mobile, 10);
                doc.emailId = req.body.email;
            }
            //save to mongodb with callback function
            doc.save(function(err, mediaUpdated){
               if (err){
                    console.log("Error updating media");
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

//Delete a specific Media Person
module.exports.mediaDeleteOne = function(req,res){
    
    var mediaID = req.params.mediaID;
    //FindOne based on MongoDB object ID 
    console.log("GET mediaID", mediaID);
    Media
        .findByIdAndRemove(mediaID)
        .exec(function(err, media){
            if(err){
                res
                    .status(404)
                    .json(err);
            } else {
                console.log("MOfficial Removed. ID: ", mediaID);
                res 
                    .status(204)
                    .json();
            }
        });
       
};

//Add a New Media Incharge
module.exports.mediaAddOne = function(req,res){
   Media
    .create({
        name: req.body.name,
        mediaCategory: req.body.mediatype,
        mediaName: req.body.medianame,
        contactNumber: parseInt(req.body.mobile, 10), 
        emailId: req.body.email
    }, function(err, media){
       if(err){
           console.log("Error creating media official" );
           res
            .status(400)
            .json(err);
       }
       else {
            console.log("MOfficer Created" );
            res
             .status(201)
             .json(media);
       }    
    });
};