const express = require('express')
const {loginUser, createUser, getUser} = require('../controllers/auth')

const router = express.Router();

router.post("/signup",createUser)
router.post("/login",loginUser)
router.post("/getuser",getUser)

module.exports = router;