const express = require('express')

const router = express.Router();

router.get("/", (req, res) => {
    console.log("get all blog")
})

router.post("/abbblog", (req, res) => {
    console.log("abbBlog")
})

router.delete("/delete/:id", (req, res) => {
    console.log("delete Blog")
})

router.put("/update/:id", (req, res) => {
    console.log("update Blog")
})

router.post("/addcommenr/:id", (req, res) => {
    console.log("add comment on Blog")
})

router.get("/getcomment/:id", (req, res) => {
    console.log("get comment on Blog")
})


router.post("/vote/:id", () => {
    console.log('vote blog')
})
module.exports = router;