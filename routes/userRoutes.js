const express = require('express');
const router = express.Router();
const {getUsers, home, createUser, getuser} = require("../controllers/userControllers");


router.get('/', home);
router.get('/getUsers', getUsers);
router.post('/createUser', createUser)
router.post('/getuser', getuser)


module.exports = router;