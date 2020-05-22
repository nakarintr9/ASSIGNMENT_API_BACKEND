const express = require('express');
const router = express.Router();
const authenController = require('../controllers/authen');


/* http://localhost:9000/auten/login */
router.post('/login',authenController.login);

/* http://localhost:9000/auten/register */
router.post('/register',authenController.register);

/* http://localhost:9000/auten/users */
router.post('/users',authenController.users);

module.exports = router;