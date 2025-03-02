import mongoose from "mongoose"
const chatSchema = new mongoose.Schema({
    senderID: { type: String }, 
    receiverID: { type: String }, 
    message: { type: String },
    time: { type: Date },
    seen: { type: Boolean },
})

export default mongoose.model.chat||mongoose.model('chat',chatSchema)