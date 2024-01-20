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
    try {
        const blogId = req.params.id;
    
        const userId = req.user.id;
    
        const blog = await Blog.findById(blogId);
    
        if(!blog){
            return res.status(404).json({message:"Blog not found", status:"error" })
        }
    
        if(blog.user !== userId){
    
            return res.status(403).json({message:"Forbidden you cannot delete someone else blog", status:"error" })
        }
    
        await Blog.findByIdAndDelete(blogId);
        res.status(200).json({
            status:"Success",
            blog,
        })
    } catch (error) {
        console.log("error"+ JSON.stringify(error));
        res.status(500).json({message:"Internal server error"})
    }
}

module.exports.updateBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
    
        const userId = req.user.id;

        const blog = await Blog.findById(blogId);
    
        if(!blog){
            return res.status(404).json({message:"Blog not found", status:"error" })
        }
    
        if(blog.user !== userId){
    
            return res.status(403).json({message:"Forbidden you cannot update someone else blog", status:"error" })
        }

        if(req.body.title){
            blog.title = req.body.title
        }

        if(req.body.description){
            blog.description = req.body.description
        }

        if(req.body.tag){
            blog.tag = req.body.tag
        }

        if(req.body.imageUrl){
            blog.imageUrl = req.body.imageUrl
        }

        // TODO : Update tag Collection as well
    
        await Blog.findByIdAndUpdate(blogId, blog);
        res.status(200).json({
            status:"Success",
            blog,
        })

    } catch (error) {
        console.log("error"+ JSON.stringify(error));
        res.status(500).json({message:"Internal server error"})
    }
}

module.exports.getComments = async (req, res) => {
    const commentId = req.params.id;

    const comment = await Comment.findById(commentId);

    if(!comment){
        return res.status(404).json({message:"Comment not found", status:"error"})
    }
    res.status(200).json({comment})
}

module.exports.addComment = async (req, res) => {
   try {
     const blogId = req.params.id;
     const {message, parentCommentId} = req.body;
     const blog = await Blog.findById(blogId);
 
     if(!blog){
         
        return res.status(404).json({message:"Blog not found", status:"error"});
 
     }
 
     const newComment = new Comment({

        user:req.user.id,
        parentCommentId:parentCommentId,
        blog:blogId,
        like:0,
        isNested:!!parentCommentId

    })
 
     await newComment.save();
 
     res.status(200).json({
         newComment
     })
   } catch (error) {
     res.status(500).json({message:"Internal server error"})
   }
}

module.exports.vote = async (req, res) => {
    try {
        const blogId = req.params.id;
        const userId = req.user.id;
        const {voteType} = req.body; // upvote or downvote
    
        const blog = Blog.findById(blog);
    
        if(!blog){
    
            return res.status(404).json({
                message:"Blog not found",
                status:"error"
            })
        }
    
        // chgeack if user has already voted
    
        if(blog.votedBy.include(userId)){
    
            return res.status(400).json({
    
                message:"User has already voted",
                status:"error"
    
            })
        }
    
        blog.upVote = voteType === 'upVote' ? blog.upVote + 1 : blog.upVote;
    
        blogdownVote = voteType === 'downVote' ? blog.downVote + 1 : blog.downVote;
    
        blog.votedBy.push(userId);
    
        const newBlog = await blog.save();
    
        res.status(200).json({message:"Voted Successfully", blog:newBlog})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})

    }


}








