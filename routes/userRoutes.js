const express = require('express');
const router = express.Router();
const {getUsers, home, createUser, getuser, getZipCode, getallzip} = require("../controllers/userControllers");


router.get('/', home);
router.get('/getUsers', getUsers);
router.post('/createUser', createUser)
router.post('/getuser', getuser) //find user by email

router.get('/zipcode/:id', getZipCode) //single zipcode data
router.get('/allzipcodesdata', getallzip) //all zipcodes data


module.exports = router;