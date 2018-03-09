var express = require('express');
var router = express.Router();

var ctrlVoterpulse = require('../controllers/voterpulse.controllers');
var ctrlUsers = require('../controllers/users.controllers');
var ctrlMedia = require('../controllers/media.controllers');
var ctrlEvents = require('../controllers/events.controllers');
var ctrlParliment = require('../controllers/parliment.controllers');
var ctrlAssembly = require('../controllers/assembly.controllers');
var ctrlLimits = require('../controllers/limits.controllers');
var ctrlArea = require('../controllers/areas.controllers');
var ctrlPollingstation = require('../controllers/pollingstation.controllers');
var ctrlOfficers = require('../controllers/officers.controllers');
var ctrlElections = require('../controllers/election.controllers');

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works');
  });

  //Election Routes
router
.route('/voterpulse/elections')
.get(ctrlElections.electionsGetAll)
  
//Voter Pulse Routes
router
    .route('/voterpulse')
    .get(ctrlVoterpulse.voterpulseGetAll)
    .get(ctrlVoterpulse.voterpulseGettoSend)

router 
    .route('/voterpulse/reports')
    .get(ctrlVoterpulse.voterpulseGetReports)

    
//router
//    .route('/voterpulse/addVoter')
//    .post(ctrlVoterpulse.voterpulseAddOne)

//router
//    //changed for user.model.js
//    .route('/voterpulse/:userID')
//    .get(ctrlVoterpulse.voterpulseGetOne)
//    .put(ctrlVoterpulse.voterpulseUpdateOne)
//    .delete(ctrlVoterpulse.voterpulseDeleteOne)

//router
//    .route('/voterpulse/:voterID')
//    .get(ctrlVoterpulse.voterpulseGetOne);
 
//Authentication Routes 
router
    .route('/voterpulse/users/login')
    .post(ctrlUsers.login);

router 
    .route('/voterpulse/users/register')
    .post(ctrlUsers.register)

//UAC for Search 
router
    .route('/voterpulse/users/uac')
    .post(ctrlUsers.uac)
    // .get(ctrlUsers.uac)

//UAC for Reports
router
    .route('/voterpulse/users/uac')
    .get(ctrlUsers.uacReports)

//Media Routes
router  
    .route('/voterpulse/media/search')
    .get(ctrlMedia.mediaGetAll)
router
    .route('/voterpulse/media/addnew')
    .post(ctrlMedia.mediaAddOne)
router
    .route('/voterpulse/media/:mediaID')
    .put(ctrlMedia.mediaUpdateOne)
    .delete(ctrlMedia.mediaDeleteOne)

//Events Routes
router 
    .route('/voterpulse/events/search')
    .get(ctrlEvents.eventsGetAll)
router
    .route('/voterpulse/events/addnew')
    .post(ctrlEvents.eventsAddOne)
router  
    .route('/voterpulse/events/:eventsID')
    .put(ctrlEvents.eventsUpdateOne)
    .delete(ctrlEvents.eventsDeleteOne)

//Parliment Routes
router 
    .route('/voterpulse/parliment/search')
    .get(ctrlParliment.parlimentGetAll)
router
    .route('/voterpulse/parliment/addParliment')
    .post(ctrlParliment.parlimentAddOne)

router
    .route('/voterpulse/parliment/:parlimentID')
    .get(ctrlParliment.parlimentGetOne)
    .put(ctrlParliment.parlimentUpdateOne)
    .delete(ctrlParliment.parlimentDeleteOne)

//Assembly Routes
router 
    .route('/voterpulse/assembly/search')
    .get(ctrlAssembly.assemblyGetAll)
router
    .route('/voterpulse/assembly/addAssembly')
    .post(ctrlAssembly.assemblyAddOne)

router
    .route('/voterpulse/assembly/:assemblyID')
    .get(ctrlAssembly.assemblyGetOne)
    .put(ctrlAssembly.assemblyUpdateOne)
    .delete(ctrlAssembly.assemblyDeleteOne)

//Limits Routes
router 
    .route('/voterpulse/limits/search')
    .get(ctrlLimits.limitsGetAll)
router
    .route('/voterpulse/limits/addLimits')
    .post(ctrlLimits.limitsAddOne)

router
    .route('/voterpulse/limits/:limitsID')
    .get(ctrlLimits.limitsGetOne)
    .put(ctrlLimits.limitsUpdateOne)
    .delete(ctrlLimits.limitsDeleteOne)

//Area Routes 
router  
    .route('/voterpulse/area/search')
    .get(ctrlArea.areaGetAll)
router
    .route('/voterpulse/area/addArea')
    .post(ctrlArea.areaAddOne)
router
    .route('/voterpulse/area/:areaID')
    .get(ctrlArea.areaGetOne)
    .put(ctrlArea.areaUpdateOne)
    .delete(ctrlArea.areaDeleteOne)

//Limits Leader Routes for Forms
router
    .route('/voterpulse/pollingstation/getbyareaid')
    .get(ctrlPollingstation.pollingstationGetByArea)

//Assembly Leader Routes for Forms
router
    .route('/voterpulse/pollingstation/getbyLimitId')
    .get(ctrlPollingstation.pollingstationGetByLimit)

//Parliment Leader Routes for forms 
router
.route('/voterpulse/limits')
.get(ctrlLimits.limitsGet)
    // .route('/voterpulse/limits/getbyacId')
    // .get(ctrlLimits.limitsGetByacId)

//Polling Station Routes
router
    .route('/voterpulse/pollingstation/search')
    .get(ctrlPollingstation.pollingstationGetAll)
router
    .route('/voterpulse/pollingstation/addStation')
    .post(ctrlPollingstation.pollingstationAddOne)
router
    .route('/voterpulse/pollingstation/:pollingstationID')
    .get(ctrlPollingstation.pollingstationGetOne)
    .put(ctrlPollingstation.pollingstationUpdateOne)
    .delete(ctrlPollingstation.pollingstationDeleteOne)

//Officer Routes
    router 
    .route('/voterpulse/officers/search')
    .get(ctrlOfficers.officersGetAll)
router
    .route('/voterpulse/officers/addnew')
    .post(ctrlOfficers.officersAddOne)
router  
    .route('/voterpulse/officers/:officersID')
    .put(ctrlOfficers.officersUpdateOne)
    .delete(ctrlOfficers.officersDeleteOne)
module.exports = router;