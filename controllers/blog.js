const User = require('../models/User');
const Blog = require('../models/Blog');
const Comment = require('../models/Comment');
const Tag = require('../models/Tag');

// consider user is logged in and its info is present in req.User
// to get all blog
module.exports.fetchAllBlog = async (req, res) => {
    const blogs = await Blog.find({});
    res.status(200).json({blogs})
}

module.exports.addBlog = async (req, res) => {
 try {
       const {title, description, tag, imageUrl} = req.body;
       const userId = req.user.id;
       const user = await User.findById(userId);
   
       const blog = new Blog({title, description, tag, imageUrl, user:userId, username:user.username, upvote:0, downvote:0, comments:[]});
   
       const newBlog = await blog.save();
   
       for(const tagContent of tag) {
           const existingTag = await Tag.findOne({
               categoryName:tagContent
           })
   
           if(!existingTag){
               const newTag = new Tag({categoryName:tagContent, category:[newBlog._id]});
   
               await newTag.save();
           } else {
               existingTag.category.push(newBlog._id);
               await existingTag.save();
           }
       }
   
       res.status(200).json({blog:newBlog})
 } catch (error) {
    console.log("error"+ JSON.stringify(error));
    res.status(500).json({message:"Internal server error"})
 }


}

module.exports.deleteBlog = async (req, res) => {
    const blogId = req.params.id;

    const userId = req.user.id;

    const blog = await Blog.findById(blogId);

    if(!blog){
        return res.status(404).json({message:"Blog not found", status:"error" })
    }

    if(blog.user !== userId){
        return res.status(403).json({message:"Forbidden you cannot delete someone else blog", status:"error" })
    }
}



