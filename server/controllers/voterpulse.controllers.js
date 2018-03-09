var mongoose = require('mongoose');
var Voters = mongoose.model('Voters');
var regexp = require('node-regexp');

//Display all Users based on query fields, AC, Limits, Polling Station, and Options  
module.exports.voterpulseGetAll = function(req, res){
    
    var query = {};
    //Get assembly Id 
    if(req.query && req.query.cid)
        query.assemblyConstituencyId = req.query.cid;
    //Get pollingStationLimits
    if(req.query && req.query.limits)
        query.pollingStationLimits = req.query.limits;

    //Get pollingStationName
    if(req.query && req.query.psarea)
        query.pollingStationName = req.query.psarea ;

    //Get pollingStationId
    if (req.query && req.query.psid)
        query.pollingStationId = req.query.psid;
    
    if(req.query && req.query.vname)
    {
        var vname = new RegExp(req.query.vname, "i");
        query.name = vname;
    } else if(!req.query.vname)
    {   
        var name = "" ;
        var vname = new RegExp('.*', "i");
        query.name = vname;
    }
    if(req.query && req.query.type)
            { 
                var type = parseInt(req.query.type, 10);
                if(type == 2)
                {
                    var bAgent = "Yes";
                    query.boothAgent = bAgent;
                }else if(type == 3)
                { 
                    var leader = ["A", "B", "C", "D", "E"];
                    query.leader = leader;
                }else if(type == 4)
                { 
                    var vip = "A+";
                    query.leader = vip;
                }else {
                    var q = 1;
                }
            }
        var projection = { 
                name : 1, fatherMotherHusand : 1, mobileNumber : 1, sex : 1, age : 1, IDNO : 1, favorTo : 1
            }
            console.log(query);
            Voters
                .find(query, projection)
                .exec(function(err, voters){
                    if(err){
                        console.log("Error finding voters");
                        res 
                            .status(500)
                            .json(err)
                    }
                    else {
                        console.log("Found voters", voters.length);
                        res
                            .json(voters);
                    } 
});
}



module.exports.voterpulseGetReports = function(req, res){
    //console.log("Finding Voters", +JSON.stringify(req.body));
    //Get assemblyConstituencyId
    //if(current_user.role.type == "MLA")
    //{ }
    //Get pollingStationLimits
        if(req.query && req.query.limits)
        {
            limits = req.query.limits;
        }
        else { 
            limits = ""; 
        }
        //Get pollingStationName
        if(req.query && req.query.psarea)
        {
            psArea = req.query.psarea;
        }else {
            psArea = "";
        }
        //Get pollingStationId
        if(req.query && req.query.psid)
        {
            psID = parseInt(req.query.psid, 10);
        }
        else
        {
            psID = null;
        }
        if(req.query && req.query.category)
        {
            category = req.query.category;
        }

        var query = {
            //assemblyConstituencyId : current_user.role.id,
            pollingStationLimits : limits, 
            pollingStationName : psArea,
            pollingStationId : psID
        };
        var projection = {favorTo : 1, caste : 1, occupation : 1, sex : 1, age : 1, outOfStation : 1 }
    
    //else if (curent_user.role == "MP")    
    //{}
    if(req.query && req.query.cid){
        var acID = parseInt(req.query.cid);
    }
    //Get pollingStationLimits
    if(req.query && req.query.limits)
    {
        limits = req.query.limits;
    }
    else if(!req.query.limits){
        limits = "";
    }
    var query = {
        assemblyConstituencyId : acID, 
        pollingStationLimits : limits, 
    };
    var projection = {favorTo : 1, caste : 1, occupation : 1, sex : 1, age : 1, outOfStation : 1 }
    Voters
        .find(query, projection)
        .exec(function(err, voters){
            if(err){
                console.log("Error finding Voters");
                res 
                    .status(500)
                    .json(err)
            }
            else {
                console.log("Found Voters", voters.length);
                res
                    .json(voters);
            } 
        });
};





module.exports.voterpulseGet = function(req, res){
    
    Voters
        .find()
        .limit(10)
        .exec(function(err, voters){
            if(err){
                console.log("Error finding voters");
                res 
                    .status(500)
                    .json(err)
            }
            else {
                console.log("Found voters", voters.length);
                res
                    .json(voters);
            } 
        });
};

module.exports.voterpulseGetOne = function(req, res) {
    var id = req.params.voterId;
  
    console.log('GET voterId', id);
  
    Voters
      .findById(id)
      .exec(function(err, doc) {
        var response = {
          status : 200,
          message : doc
        };
        if (err) {
          console.log("Error finding voter");
          response.status = 500;
          response.message = err;
        } else if(!doc) {
          console.log("voterId not found in database", id);
          response.status = 404;
          response.message = {
            "message" : "voter ID not found " + id
          };
        }
        res
          .status(response.status)
          .json(response.message);
      });
  
  };
  
//Send SMS / IVR endpoint
  module.exports.voterpulseGettoSend = function(req, res){
    //console.log("Finding Voters", +JSON.stringify(req.body));
    //Get assemblyConstituencyId
    
    //if(current_user.role.type == "MP")   
    //}
        
    if(req.query && req.query.cid){
        var acID = parseInt(req.query.cid);
    }
    //Get pollingStationLimits
    if(req.query && req.query.limits)
    {
        limits = req.query.limits;
    }
    //Get pollingStationName
    if(req.query && req.query.psarea)
    {
        psArea = req.query.psarea;
    }
    //Get pollingStationId
    if(req.query && req.query.psid)
    {
        psID = parseInt(req.query.psid, 10);
    }
    
    var projection = { mobileNumber : 1 };
   
    if(req.query && req.query.category)
        {
            var category = req.query.category;
            //All 
            if(category == "0"){
            
                Voters
                    .find(query, projection)
                    .exec(function(err, users){
                    if(err){
                        console.log("Error finding Users");
                    res 
                        .status(500)
                        .json(err)
                    }
                    else {
                        console.log("Found Users", users.length);
                    res
                        .json(users);
                    } 
                });
            }
            //Caste
            else if(category == "c"){
                var value = req.query.type;
                var query = {
                    assemblyConstituencyId : acID, 
                    pollingStationLimits : limits, 
                    pollingStationName : psArea,
                    pollingStationId : psID,
                    caste : value
                };
                Voters
                    .find(query, projection)
                    .exec(function(err, users){
                    if(err){
                        console.log("Error finding Users");
                    res 
                        .status(500)
                        .json(err)
                    }
                    else {
                        console.log("Found Users", users.length);
                    res
                        .json(users);
                    }
                })

            }
            //Party
            else if(category == "p"){
                var value = req.query.type;
                var query = {
                    assemblyConstituencyId : acID, 
                    pollingStationLimits : limits, 
                    pollingStationName : psArea,
                    pollingStationId : psID,
                    favorTo : value
                };
                Voters
                    .find(query, projection)
                    .exec(function(err, users){
                    if(err){
                        console.log("Error finding Users");
                    res 
                        .status(500)
                        .json(err)
                    }
                    else {
                        console.log("Found Users", users.length);
                    res
                        .json(users);
                    } 
            })

            }
            //Occupation
            else if(category == "o"){
                var value = req.query.type;
                var query = {
                    assemblyConstituencyId : acID, 
                    pollingStationLimits : limits, 
                    pollingStationName : psArea,
                    pollingStationId : psID,
                    occupation : value
                };
                Voters
                    .find(query, projection)
                    .exec(function(err, users){
                    if(err){
                        console.log("Error finding Users");
                    res 
                        .status(500)
                        .json(err)
                    }
                    else {
                        console.log("Found Users", users.length);
                    res
                        .json(users);
                    } 
            })

            }
            //Gender
            else if(category == "g"){
                var value = req.query.type;
                var query = {
                    assemblyConstituencyId : acID, 
                    pollingStationLimits : limits, 
                    pollingStationName : psArea,
                    pollingStationId : psID,
                    sex : value
                };
                Voters
                    .find(query, projection)
                    .exec(function(err, users){
                    if(err){
                        console.log("Error finding Users");
                    res 
                        .status(500)
                        .json(err)
                    }
                    else {
                        console.log("Found Users", users.length);
                    res
                        .json(users);
                    } 
            })

            }
            //Leader
            else if(category == "l"){
                var value = req.query.type;
                var query = {
                    assemblyConstituencyId : acID, 
                    pollingStationLimits : limits, 
                    pollingStationName : psArea,
                    pollingStationId : psID,
                    leader : value
                };
                Voters
                    .find(query, projection)
                    .exec(function(err, users){
                    if(err){
                        console.log("Error finding Users");
                    res 
                        .status(500)
                        .json(err)
                    }
                    else {
                        console.log("Found Users", users.length);
                    res
                        .json(users);
                    } 
            })

            }
            //Booth Agent
            else if(category == "b"){
                var value = req.query.type;
                var query = {
                    assemblyConstituencyId : acID, 
                    pollingStationLimits : limits, 
                    pollingStationName : psArea,
                    pollingStationId : psID,
                    boothAgent : value
                };
                Voters
                    .find(query, projection)
                    .exec(function(err, users){
                    if(err){
                        console.log("Error finding Users");
                    res 
                        .status(500)
                        .json(err)
                    }
                    else {
                        console.log("Found Users", users.length);
                    res
                        .json(users);
                    } 
            })

            }
            //VIPs
            else if(category == "v"){
                var value = req.query.type;
                var query = {
                    assemblyConstituencyId : acID, 
                    pollingStationLimits : limits, 
                    pollingStationName : psArea,
                    pollingStationId : psID,
                    leader : value
                };
                Voters
                    .find(query, projection)
                    .exec(function(err, users){
                    if(err){
                        console.log("Error finding Users");
                    res 
                        .status(500)
                        .json(err)
                    }
                    else {
                        console.log("Found Users", users.length);
                    res
                        .json(users);
                    } 
            })

            }
            //Out of Station
            else if(category == "os"){
                var value = req.query.type;
                var query = {
                    assemblyConstituencyId : acID, 
                    pollingStationLimits : limits, 
                    pollingStationName : psArea,
                    pollingStationId : psID,
                    outOfStation : value
                };
                Voters
                    .find(query, projection)
                    .exec(function(err, users){
                    if(err){
                        console.log("Error finding Users");
                    res 
                        .status(500)
                        .json(err)
                    }
                    else {
                        console.log("Found Users", users.length);
                    res
                        .json(users);
                    } 
            })

            }
            }
        }
   

    
    