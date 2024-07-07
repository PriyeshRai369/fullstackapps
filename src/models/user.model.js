import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'


const userSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            trim:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            trim:true,
        },
        fullname:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        profilePic:{
            type:String,
        },
        password:{
            type:String,
            required:true
        },
    },{ timestamps: true }
)

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next()
    } else{
        this.password=await bcrypt.hash(this.password, 10)
        next()
    }
})
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

export const reactUser=mongoose.model("reactUser",userSchema)