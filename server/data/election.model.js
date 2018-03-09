var mongoose = require('mongoose');

var electionSchema = new mongoose.Schema({

 id : {
 type : Number
 },
 boothNo : { 
 type : Number
 }, 
 areaName : {
 type : String
 }, 
 pollingStationDetails : {
 type : String
 }, 
 totalVotes : { 
 type : Number
 }, 
 polledVotes : { 
 type : Number
 }, 
 TDP : { 
 type : Number
 }, 
 NAVODAYAM : {
 type : Number
 }, 
 YSRCP : { 
 type : Number
 }, 
 INDEPENDENT : { 
 type : Number
 }, 
 boothFavorTo : { 
 type : String
 }
}); 

mongoose.model('Election14', electionSchema, 'election2014');