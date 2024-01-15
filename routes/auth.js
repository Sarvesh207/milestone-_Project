const express = require('express')

const router = express.Router();

router.post("/signup", (req, res) => {
    console.log("signup")
})
router.post("/login", (req, res) => {
    console.log("login")
})
router.post("/getuser", (req, res) => {
    console.log("getuser")
})

module.exports = router;