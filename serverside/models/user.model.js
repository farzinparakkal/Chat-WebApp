import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    profile: { type: String }, 
    username: { type: String }, 
    email: { type: String },
    phone: { type: Number },
    pass: { type: String },
})

export default mongoose.model.user||mongoose.model('user',userSchema)