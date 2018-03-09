//Updated officers.controllers.js 

var mongoose = require('mongoose');
var Officers = mongoose.model('Officers');

//Display all existing Officers
module.exports.officersGetAll = function(req, res){
    
    Officers
        .find()
        .exec(function(err, officers){
            if(err){
                console.log("Error finding Officers");
                res 
                    .status(500)
                    .json(err)
            }
            else {
                console.log(JSON.stringify(officers));
                console.log("Found Officers", officers.length);
                res
                    .json(officers)
            } 
        });
};

//Search for a specific Officer
//Copy from vp.controllers.js 

//Update an existing Officer 
module.exports.officersUpdateOne = function(req,res){
    
    var officersID = req.params.officersID;
    //FindOne based on MongoDB object ID 
    console.log("GET officersID", officersID);
    Officers
        .findById(officersID)
        .exec(function(err, doc){
            var response = {
                status : 200,
                message : doc 
            }; 
            if(err){
                console.log("Error finding Officer");
                response.status = 500;
                response.message = err;
            } else if(!doc){
                response.status = 404;
                response.message = { "message" : "Officer record Not found"} ;
            }
            if (response.status !== 200){
                res
                .status(response.status)
                .json(response.message); 
            } else {
                doc.name = req.body.name;
                doc.designation = req.body.designation;
                doc.department = req.body.department;
                doc.contactNumber = parseInt(req.body.mobile, 10);
                doc.emailId = req.body.email;
            }
            //save to mongodb with callback function
            doc.save(function(err, officersUpdated){
               if (err){
                    console.log("Error updating Officer");
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

//Delete a specific Officer
module.exports.officersDeleteOne = function(req,res){
    
    var officersID = req.params.officersID;
    //FindOne based on MongoDB object ID 
    console.log("GET officersID", officersID);
    Officers
        .findByIdAndRemove(officersID)
        .exec(function(err, officers){
            if(err){
                res
                    .status(404)
                    .json(err);
            } else {
                console.log("Officer Removed. ID: ", officersID);
                res 
                    .status(204)
                    .json();
            }
        });
       
};

//Add a New Officer 
module.exports.officersAddOne = function(req,res){
   Officers 
    .create({
        name: req.body.name,
        designation: req.body.designation,
        department: req.body.department,
        contactNumber: parseInt(req.body.mobile, 10), 
        emailId: req.body.email
    }, function(err, officers){
       if(err){
           console.log("Error creating officer" );
           res
            .status(400)
            .json(err);
       }
       else {
            console.log("Officer Created" );
            res
             .status(201)
             .json(officers);
       }    
    });
};



