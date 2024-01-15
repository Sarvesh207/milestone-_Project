const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            min:3,
            max:25
        },
        email:{
            type:String,
            required:true,
            unique:true,
            
        },
        password:{
            type:String,
            required:true,
            min:5
            
        },
        resetPasswordToken:String,
        resetPasswordExpiry:String,

    },{
        timestamps:true
    }
)
userSchema.pre("save", async function (next){
    const user = this;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt(user.password, salt);
    user.password = hashedPassword
    next()
})



module.exports = mongoose.model('User',userSchema)