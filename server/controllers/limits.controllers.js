var mongoose = require('mongoose');
var Limits = mongoose.model('Limits');

//GetBy AssemblyID 
module.exports.limitsGet = function(req, res){
    var acId = parseInt(req.query.acId, 10);
    Limits
        .find({constitutionId : acId})
        .exec(function(err, limits){
            if(err){
                console.log("Error finding limits");
                res 
                    .status(500)
                    .json(err)
            }
            else {
                console.log("Found limits", limits.length);
                res
                    .json(limits);
            } 
        });
};
// module.exports.limitsGetByacId = function (req, res) {
//     var acId = parseInt(req.query.acId,10);
//     console.log(acId);
//     Limits
//         .find({ constitutionId: acId})
//         .exec(function (err, doc) {
//             res
//                 .status(200)
//                 .json(doc);
//         });
// };

//Display all existing limits
module.exports.limitsGetAll = function(req, res){
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
    Limits
        .find()
        .skip(offset)
        .limit(count)
        .exec(function(err, limits){
            if(err){
                console.log("Error finding limits");
                res 
                    .status(500)
                    .json(err)
            }
            else {
                console.log("Found limits", limits.length);
                res
                    .json(limits);
            } 
        });
};

//Search for a specific limits
//Copy from vp.controllers.js 

//Update an existing limits
module.exports.limitsUpdateOne = function(req,res){
    
    var limitsID = req.params.limitsID;
    //FindOne based on MongoDB object ID 
    console.log("GET limitsID", limitsID);
    Limits
        .findById(limitsID)
        .exec(function(err, doc){
            var response = {
                status : 200,
                message : doc 
            }; 
            if(err){
                console.log("Error finding limits");
                response.status = 500;
                response.message = err;
            } else if(!doc){
                response.status = 404;
                response.message = { "message" : "limits record Not found"} ;
            }
            if (response.status !== 200){
                res
                .status(response.status)
                .json(response.message); 
            } else {
                doc.acID = parseInt(req.body.acID, 10);
                doc.lmID = parseInt(req.body.lmID, 10);
                doc.lmName = req.body.lmName;
            }
            //save to mongodb with callback function
            doc.save(function(err, limitsUpdated){
               if (err){
                    console.log("Error updating limits");
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

//Delete a specific limits
module.exports.limitsDeleteOne = function(req,res){
    
    var limitsID = req.params.limitsID;
    //FindOne based on MongoDB object ID 
    console.log("GET limitsID", limitsID);
    Limits
        .findByIdAndRemove(limitsID)
        .exec(function(err, limits){
            if(err){
                res
                    .status(404)
                    .json(err);
            } else {
                console.log("limits Removed. ID: ", limitsID);
                res 
                    .status(204)
                    .json();
            }
        });
       
};

//Add a New limits 
module.exports.limitsAddOne = function(req,res){
   Limits
    .create({
        acID : parseInt(req.body.acID, 10),
        lmID : parseInt(req.body.lmID, 10),
        lmName: req.body.lmName
    }, function(err, limits){
       if(err){
           console.log("Error creating limits" );
           res
            .status(400)
            .json(err);
       }
       else {
            console.log("limits Created" );
            res
             .status(201)
             .json(limits);
       }    
    });
};

module.exports.limitsGetOne = function(req,res){
    
    var limitsID = req.params.limitsID;
    //FindOne based on MongoDB object ID 
    Limits
        .findById(limitsID)
        .exec(function(err, doc){
            res 
                .status(200)
                .json(doc);
            });
};
