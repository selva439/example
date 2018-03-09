var mongoose = require('mongoose');
var Parliment = mongoose.model('Parliment');

//Display all existing Parliment
module.exports.parlimentGetAll = function(req, res){
    var offset = 0;
    var count = 5; 
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset, 10);
    }
    if(req.query && req.query.count){
        offset = parseInt(req.query.count, 10);
    }

    if(isNaN(offset) || isNaN(count)){
        res
            .status(400)
            .json({
                "message" : "QueryString Offset and Count should be a Number "
            });
        return;
    }
    Parliment
        .find()
        .skip(offset)
        .limit(count)
        .exec(function(err, parliment){
            if(err){
                console.log("Error finding Parliment");
                res 
                    .status(500)
                    .json(err)
            }
            else {
                console.log("Found Parliment", parliment.length);
                res
                    .json(parliment);
            } 
        });
};

//Search for a specific parliment
//Copy from vp.controllers.js 

//Update an existing Parliment
module.exports.parlimentUpdateOne = function(req,res){
    
    var parlimentID = req.params.parlimentID;
    //FindOne based on MongoDB object ID 
    console.log("GET parlimentID", parlimentID);
    Parliment
        .findById(parlimentID)
        .exec(function(err, doc){
            var response = {
                status : 200,
                message : doc 
            }; 
            if(err){
                console.log("Error finding Parliment");
                response.status = 500;
                response.message = err;
            } else if(!doc){
                response.status = 404;
                response.message = { "message" : "Parliment record Not found"} ;
            }
            if (response.status !== 200){
                res
                .status(response.status)
                .json(response.message); 
            } else {
                doc.pcID = parseInt(req.body.pcID, 10);
                doc.name = req.body.name;
            }
            //save to mongodb with callback function
            doc.save(function(err, parlimentUpdated){
               if (err){
                    console.log("Error updating parliment");
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

//Delete a specific parliment
module.exports.parlimentDeleteOne = function(req,res){
    
    var parlimentID = req.params.parlimentID;
    //FindOne based on MongoDB object ID 
    console.log("GET parlimentID", parlimentID);
    parliment
        .findByIdAndRemove(parlimentID)
        .exec(function(err, parliment){
            if(err){
                res
                    .status(404)
                    .json(err);
            } else {
                console.log("Parliment Removed. ID: ", parlimentID);
                res 
                    .status(204)
                    .json();
            }
        });
       
};

//Add a New parliment 
module.exports.parlimentAddOne = function(req,res){
   Parliment 
    .create({
        pcID : parseInt(req.body.pcID, 10),
        pcName: req.body.pcName
    }, function(err, parliment){
       if(err){
           console.log("Error creating parliment" );
           res
            .status(400)
            .json(err);
       }
       else {
            console.log("Parliment Created" );
            res
             .status(201)
             .json(parliment);
       }    
    });
};

module.exports.parlimentGetOne = function(req,res){
    
    var parlimentID = req.params.parlimentID;
    //FindOne based on MongoDB object ID 
    Parliment
        .findById(parlimentID)
        .exec(function(err, doc){
            res 
                .status(200)
                .json(doc);
            });
};
