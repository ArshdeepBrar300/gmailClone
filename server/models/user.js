import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema= new mongoose.Schema({
    googleId:String,
    displayName:String,
    email:String,
    image:String,
    emails:[{ type: Schema.Types.ObjectId, ref: 'emails' }]
},{timestamps:true})

const user= mongoose.model('Users',userSchema)
export default user