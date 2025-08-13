import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


//login 
const loginUser = async (req,res)=>{
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if (!user) {
            res.json({success:false,message:"User Don't Exist!"})
        }
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            res.json({success:false,message:"Invalid Password or Email!"});
        }

        const token = createToken(user._id);

        res.json({success:true,token})

    } catch (error) {
        console.log(error);

        res.json({success:false,message:"Error!"})
    }
}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register

const registerUser = async (req,res)=>{
    const {name,password,email}= req.body;
    try {
        const exist=await userModel.findOne({email});
        if(exist){
            return res.json({success:false,message:"Already Exist!"});
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Enter a Valid Email"});
        }

        if(password.length<8){
            res.json({success:false,message:"Enter a Stronger Password!"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save();

        const token = createToken(user._id)

        res.json({success:true,token});

    } catch (error) {
        console.log(error);
        res.json({success:true,message:"Error!"});
    }
}


export {loginUser,registerUser};