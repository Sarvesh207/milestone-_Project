const mongoose = require('mongoose')
const User = require('../models/User')
const jwt = require('jsonwebroken')
const secretKey = "MilestoneProject"
const brcypt = require('bcrypt')

const createUser = async (req, res) => {
    const {username, password, email} = req.body;

    try {
        const userInput = new User(username, password, email)
        const user = await user.save();

        const token = jwt.sign({username :user.username, userId:user._id},{secretKey})

        return res.status(201).json({message:"User registered successfully", token})
    } catch (error) {
        return res.status(401).json({message:"User regstering failed",status:"error" })

    }
}

const login = async (req, res) => {
    const {username, password} = req.body;
    try {
        if(!username || !password){

            return res.status(401).json({message:"username/password can not be empty",status:"error" })
        }

        const user = await User.findOne({username});
        if(!user){

            return res.status(401).json({message:"username invalid",status:"error" })

        }
        
        // Check if password matches

        const isPasswordMatch = await brcypt.compare(password, user.password)
        
        if(!isPasswordMatch){
            return res.status(401).json({message:"username/password invalid",status:"error" })

        }

        const token = jwt.sign({username :user.username, userId:user._id},{secretKey})

        return res.status(201).json({message:"login successfully", token})

    } catch (error) {

        return res.status(401).json({message:"Auth failed",status:"error" })
    }
}

const getUser = async (req, res) => {
    const id = req.body.id;

    const user = await User.findById(id).select("-password");
    return res.status(201).json({user});

}   

module.exports = {createUser, loginUser,getUser }
