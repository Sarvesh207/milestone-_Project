const mongoose = require('mongoose')
const User  = require("./User")
const Blog = require('./Blog')

const commentSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        parentComment:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        },
        blog:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Blog"
        },
        message:String,
        likes:Number,
        isNested:Boolean,
        comments:[this]
        

    },{
        timestamps:true
    }
)




module.exports = mongoose.model('Comment',commentSchemaSchema)