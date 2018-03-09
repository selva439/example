var mongoose = require('mongoose');
var Assembly = mongoose.model('Assembly');

//Display all existing Assembly
module.exports.assemblyGetAll = function(req, res){
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
    Assembly
        .find()
        .skip(offset)
        .limit(count)
        .exec(function(err, assembly){
            if(err){
                console.log("Error finding assembly");
                res 
                    .status(500)
                    .json(err)
            }
            else {
                console.log("Found assembly", assembly.length);
                res
                    .json(assembly);
            } 
        });
};

//Search for a specific assembly
//Copy from vp.controllers.js 

//Update an existing assembly
module.exports.assemblyUpdateOne = function(req,res){
    
    var assemblyID = req.params.assemblyID;
    //FindOne based on MongoDB object ID 
    console.log("GET assemblyID", assemblyID);
    Assembly
        .findById(assemblyID)
        .exec(function(err, doc){
            var response = {
                status : 200,
                message : doc 
            }; 
            if(err){
                console.log("Error finding assembly");
                response.status = 500;
                response.message = err;
            } else if(!doc){
                response.status = 404;
                response.message = { "message" : "assembly record Not found"} ;
            }
            if (response.status !== 200){
                res
                .status(response.status)
                .json(response.message); 
            } else {
                doc.pcID = parseInt(req.body.pcID, 10);
                doc.acID = parseInt(req.body.acID, 10);
                doc.acName = req.body.acName;
            }
            //save to mongodb with callback function
            doc.save(function(err, assemblyUpdated){
               if (err){
                    console.log("Error updating assembly");
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

//Delete a specific assembly
module.exports.assemblyDeleteOne = function(req,res){
    
    var assemblyID = req.params.assemblyID;
    //FindOne based on MongoDB object ID 
    console.log("GET assemblyID", assemblyID);
    Assembly
        .findByIdAndRemove(assemblyID)
        .exec(function(err, assembly){
            if(err){
                res
                    .status(404)
                    .json(err);
            } else {
                console.log("assembly Removed. ID: ", assemblyID);
                res 
                    .status(204)
                    .json();
            }
        });
       
};

//Add a New assembly 
module.exports.assemblyAddOne = function(req,res){
   Assembly
    .create({
        pcID : parseInt(req.body.pcID, 10),
        acID : parseInt(req.body.acID, 10),
        acName: req.body.acName
    }, function(err, assembly){
       if(err){
           console.log("Error creating assembly" );
           res
            .status(400)
            .json(err);
       }
       else {
            console.log("assembly Created" );
            res
             .status(201)
             .json(assembly);
       }    
    });
};

module.exports.assemblyGetOne = function(req,res){
    
    var assemblyID = req.params.assemblyID;
    //FindOne based on MongoDB object ID 
    Assembly
        .findById(assemblyID)
        .exec(function(err, doc){
            res 
                .status(200)
                .json(doc);
            });
};
