var mongoose = require('mongoose');
var Elections = mongoose.model('Election14');

//Display all existing elections
module.exports.electionsGetAll = function(req, res){

 Elections
 .find()
 .exec(function(err, elections){
 if(err){
 console.log("Error finding elections");
 res 
 .status(500)
 .json(err)
 }
 else {
 console.log("Found elections", elections.length);
 res
 .json(elections);
 } 
 });
};