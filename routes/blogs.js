const express = require('express');
const { fetchAllBlog, addBlog, deleteBlog, updateBlog, addComment, getComments, vote } = require('../controllers/blog');

const router = express.Router();

router.get("/",fetchAllBlog)
router.post("/addblog",addBlog)
router.delete("/delete/:id",deleteBlog)
router.put("/update/:id", updateBlog)
router.post("/addcommenr/:id",addComment)
router.get("/getcomment/:id", getComments)
router.post("/vote/:id",vote )
module.exports = router;