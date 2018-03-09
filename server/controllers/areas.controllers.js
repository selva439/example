var mongoose = require('mongoose');
var Area = mongoose.model('Area');

//Display all existing area
module.exports.areaGetAll = function(req, res){
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
    Area
        .find()
        .skip(offset)
        .limit(count)
        .exec(function(err, area){
            if(err){
                console.log("Error finding area");
                res 
                    .status(500)
                    .json(err)
            }
            else {
                console.log("Found area", area.length);
                res
                    .json(area);
            } 
        });
};

//Search for a specific area
//Copy from vp.controllers.js 

//Update an existing area
module.exports.areaUpdateOne = function(req,res){
    
    var areaID = req.params.areaID;
    //FindOne based on MongoDB object ID 
    console.log("GET areaID", areaID);
    Area
        .findById(areaID)
        .exec(function(err, doc){
            var response = {
                status : 200,
                message : doc 
            }; 
            if(err){
                console.log("Error finding area");
                response.status = 500;
                response.message = err;
            } else if(!doc){
                response.status = 404;
                response.message = { "message" : "area record Not found"} ;
            }
            if (response.status !== 200){
                res
                .status(response.status)
                .json(response.message); 
            } else {
                doc.lmID = parseInt(req.body.lmID, 10);
                doc.arID = parseInt(req.body.arID, 10);
                doc.arName = req.body.arName;
            }
            //save to mongodb with callback function
            doc.save(function(err, areaUpdated){
               if (err){
                    console.log("Error updating area");
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

//Delete a specific area
module.exports.areaDeleteOne = function(req,res){
    
    var areaID = req.params.areaID;
    //FindOne based on MongoDB object ID 
    console.log("GET areaID", areaID);
    Area
        .findByIdAndRemove(areaID)
        .exec(function(err, area){
            if(err){
                res
                    .status(404)
                    .json(err);
            } else {
                console.log("area Removed. ID: ", areaID);
                res 
                    .status(204)
                    .json();
            }
        });
       
};

//Add a New area 
module.exports.areaAddOne = function(req,res){
   Area
    .create({
        lmID : parseInt(req.body.lmID, 10),
        arID : parseInt(req.body.arID, 10),
        arName: req.body.arName
    }, function(err, area){
       if(err){
           console.log("Error creating area" );
           res
            .status(400)
            .json(err);
       }
       else {
            console.log("area Created" );
            res
             .status(201)
             .json(area);
       }    
    });
};

module.exports.areaGetOne = function(req,res){
    
    var areaID = req.params.areaID;
    //FindOne based on MongoDB object ID 
    Area
        .findById(areaID)
        .exec(function(err, doc){
            res 
                .status(200)
                .json(doc);
            });
};
