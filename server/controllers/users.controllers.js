var mongoose = require('mongoose');
var User = mongoose.model('Users');
var pollingStation = mongoose.model('PollingStation');
var Limits = mongoose.model('Limits');
var Assembly = mongoose.model('Assembly');
var area = mongoose.model('Area');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

//Login 
module.exports.login = function (req, res) {
    console.log('Logging in User' + JSON.stringify(req.body)); 
    var mobile = req.body.mobile;
    var password = req.body.password; 

    User
    .findOne({
        phone : mobile
    })
    .exec(function(err, user){
        if(err) {
            console.log(err);
            res
                .status(400)
                .json(err);
        }
        else {
            console.log(JSON.stringify(user));
            if(bcrypt.compareSync(password, user.password)){
                console.log("User Valid", user);
                var token = jwt.sign({mobile : user.mobile}, 'sec', {expiresIn : 3600});
                res
                .status(200)
                .json({success : true, data : user}); 
            }
            else { 
                console.log("Unauthorized access");
                res
                .status(401)
                .json("Unauthorized");
            }   
        }
            
    });
};

module.exports.uac = function (req, res) {

    console.log('json data '+ req.body);
     var current_user = req.body;
    console.log(current_user.name);
    console.log(current_user.role.leader);
    //Limit Leader
    if (current_user.role.leader == "limits") {
        area.find({ limitId: current_user.role.id })
            .exec(function (err, limitData) {
                if (err) {
                    console.log(err);
                    res
                        .status(400)
                        .json(err);
                }
                else {
                    console.log(JSON.stringify(limitData));
                    var objToSend = {
                        showParliment: 'false',
                        showAssembly: 'false',    
                        showLimit: 'false',
                        showArea: 'true',
                        showBooth: 'true',
                        nextUrl:"api/voterpulse/pollingstation/getbyareaid?areaName=",
                        Areadata: limitData
                    };
                    res.send(objToSend);
                }
            });
    }
    //Area Leader

    else if (current_user.role.leader == "area") {
        console.log(current_user);
        pollingStation
            .find({ pollingStationName: current_user.role.rname })
            .exec(function (err, areaData) {
                if (err) {
                    console.log(err);
                    res
                        .status(400)
                        .json(err);
                }
                else {
                    console.log(areaData);
                    console.log(JSON.stringify(areaData));
                    var objToSend = {
                        showParliment: 'false',
                        showAssembly: 'false',    
                        showLimit: 'false',
                        showArea: 'false',
                        showBooth: 'true',
                        Areadata: areaData
                    };
                    console.log(objToSend);
                    res.send(objToSend);
                }
            });
    }
    //Booth Agent
    /*var uacBoothdata= {
        name: "venkatesh",
        id: 10,
        phone: "9600748403",
        password: "FSDFSDF",
        role: {
            type: "booth",
            id: 95
        }
    };
    req.session.user = userData;
    var current_user = req.session.user;*/
    else if (current_user.role.leader == "booth") {
        pollingStation
            .find({ pollingStationNameId: current_user.role.id }, { _id: 1, pollingStationNameId: 1, pollingStationLocation: 1 })
            .exec(function (err, boothData) {
                if (err) {
                    console.log(err);
                    res
                        .status(400)
                        .json(err);
                }
                else {
                    console.log(JSON.stringify(boothData));
                    var objToSend = {
                        showParliment: 'false',
                        showAssembly: 'false',    
                        showLimit: 'false',
                        showArea: 'false',
                        showBooth: 'false',
                        Boothdata: boothData
                    };
                    res.send(objToSend);
                }
        });
    }
    //MLA
    /*var uacBoothdata= {
        name: "venkatesh",
        id: 10,
        phone: "9600748403",
        password: "FSDFSDF",
        role: {
            type: "MLA",
            id: 106
        }
    };
    req.session.user = userData;
    var current_user = req.session.user;*/
    else if (current_user.role.leader == "MLA") {
        Limits
            .find({ constitutionId: current_user.role.id }, { _id: 1, id: 1, name: 1 })
            .exec(function (err, assemblyData) {
                if (err) {
                    console.log(err);
                    res
                        .status(400)
                        .json(err);
                }
                else {
                    console.log(JSON.stringify(assemblyData));
                    var objToSend = {
                        showParliment: 'false',
                        showAssembly: 'false',    
                        showLimit: 'true',
                        showArea: 'true',
                        showBooth: 'true',
                        nextUrl:"api/voterpulse/pollingstation/getbyLimitId?limitId=",
                        AssemblyData: assemblyData
                    };
                    res.send(objToSend);
                }
        });
    }
//MP
    /*var uacBoothdata= {
        name: "venkatesh",
        id: 10,
        phone: "9600748403",
        password: "FSDFSDF",
        role: {
            type: "MP",
            id: 15
        }
    };
    req.session.user = userData;
    var current_user = req.session.user;*/
    else if (current_user.role.leader == "MP") {
        Assembly
            .find({ pcId: current_user.role.id }, { _id: 1, assemblyConstituencyId: 1, assemblyConstituencyName: 1 })
            .exec(function (err, parlimentData) {
                if (err) {
                    console.log(err);
                    res
                        .status(400)
                        .json(err);
                }
                else {
                    console.log(JSON.stringify(parlimentData));
                    var objToSend = {
                        showParliment: 'false',
                        showAssembly: 'true',    
                        showLimit: 'true',
                        showArea: 'true',
                        showBooth: 'true',
                        nextUrl:"api/voterpulse/limits/getbyacId?acId=",
                        AssemblyData: parlimentData
                    };
                    res.send(objToSend);
                }
        });
    };
}
//UAC for Reports
module.exports.uacReports = function (req, res) {
        // hardcoding the user data .. but in future have to fetch from session -- Venkatesh
        //MLA
        /*var uacBoothdata= {
            name: "venkatesh",
            id: 10,
            phone: "9600748403",
            password: "FSDFSDF",
            role: {
                type: "MLA",
                id: 106
            }
        };
        req.session.user = userData;
        var current_user = req.session.user;*/
        if (current_user.role.type == "MLA") {
            Limits
                .find({ constitutionId: current_user.role.id }, { _id: 1, id: 1, name: 1 })
                .exec(function (err, assemblyData) {
                    if (err) {
                        console.log(err);
                        res
                            .status(400)
                            .json(err);
                    }
                    else {
                        console.log(JSON.stringify(assemblyData));
                        var objToSend = {
                            showParliment: 'false',
                            showAssembly: 'false',    
                            showLimit: 'true',
                            showArea: 'true',
                            showBooth: 'true',
                            nextUrl:"api/voterpulse/pollingstation/getbyLimitId?limitId=",
                            AssemblyData: assemblyData
                        };
                        res.send(objToSend);
                    }
            });
        }
    //MP
        /*var uacBoothdata= {
            name: "venkatesh",
            id: 10,
            phone: "9600748403",
            password: "FSDFSDF",
            role: {
                type: "MP",
                id: 15
            }
        };
        req.session.user = userData;
        var current_user = req.session.user;*/
        else if (current_user.role.type == "MP") {
            Assembly
                .find({ pcId: current_user.role.id }, { _id: 1, assemblyConstituencyId: 1, assemblyConstituencyName: 1 })
                .exec(function (err, parlimentData) {
                    if (err) {
                        console.log(err);
                        res
                            .status(400)
                            .json(err);
                    }
                    else {
                        console.log(JSON.stringify(parlimentData));
                        var objToSend = {
                            showParliment: 'false',
                            showAssembly: 'true',    
                            showLimit: 'true',
                            showArea: 'false',
                            showBooth: 'false',
                            nextUrl:"api/voterpulse/limits/getbyacId?acId=",
                            AssemblyData: parlimentData
                        };
                        res.send(objToSend);
                    }
            });
        };
    }

//Create User
module.exports.register = function (req, res) {
    console.log('Registering a new User' + JSON.stringify(req.body)); 
    var name = req.body.name;
    var mobile = parseInt(req.body.phone, 10);
    var password = req.body.password;
    var leader = req.body.leader;
    if(req.body.id){
        var id = parseInt(req.body.id, 10);
        var params = { 
            name : name, 
            phone : mobile, 
            password : bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
            role : {
                leader : leader, 
                id : id
            }
        };
    } else if (req.body.rname){
        var rname = req.body.rname;
        var params = { 
            id : id, 
            name : name, 
            phone : mobile, 
            password : bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
            role : {
                leader : leader, 
                rname : rname
            }
        };
    }

    User
        .create(params, function(err, user){
        if(err) {
            console.log(err);
            res
                .status(400)
                .json(err);
        }
        else { 
            console.log("User Created", user);
            res
                .status(201)
                .json(user)
        }
            
    });
};