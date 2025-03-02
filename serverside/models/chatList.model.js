import mongoose from "mongoose"
const chatListSchema = new mongoose.Schema({
    senderID: { type: String }, 
    receiverID: { type: String },
})

export default mongoose.model.chat_List||mongoose.model('chat_List',chatListSchema)