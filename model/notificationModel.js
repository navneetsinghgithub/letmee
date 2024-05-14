const mongoose = require("mongoose")
const notificationSchema = new mongoose.Schema({
    senderId:
        { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    receiverId:
        { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    notification_type:
        { type: Number, enum: [1, 2], default: 1 }, ////
    notification_message:
        { type: String },
    is_read:
        { type: Number, enum: [0, 1], default: 0 },  // unread =0 , read = 1
}, { timestamps: true })
const notification = mongoose.model("notification", notificationSchema)
module.exports = notification