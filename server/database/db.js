import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
const dbConnection=()=>{
    const DB_URI=`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@gmailclone.xtkeynz.mongodb.net/?retryWrites=true&w=majority`
    try {
        mongoose.connect(DB_URI,{useNewUrlParser:true})
        console.log('Database connected successfully');
        
    } catch (error) {
        console.log('Error connecting to database ',error.message);
        
    }
}
export default dbConnection