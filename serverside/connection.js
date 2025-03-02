import mongoose from "mongoose";

export default async function connection(){
    const db=await mongoose.connect('mongodb+srv://anvarmelethil135:test123@cluster0.5wxq1.mongodb.net/ChatApp');
    console.log("database connected");
    
    return db
}