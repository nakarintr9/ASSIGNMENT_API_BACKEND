const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const DOSCGController = require('../controllers/DOSCG');


/* http://localhost:9000/DOSCG/findXYZ */
router.post('/findXYZ',DOSCGController.findXYZ);

/* http://localhost:9000/DOSCG/findBC */
router.post('/findBC',DOSCGController.findBC);

/* http://localhost:9000/DOSCG/findTheBestWay */
router.post('/findTheBestWay',DOSCGController.findTheBestWay);

/* http://localhost:9000/DOSCG/findTheBestWay */
// router.post('/lineMessagingCallback',DOSCGController.lineMessagingCallback);


module.exports = router;
