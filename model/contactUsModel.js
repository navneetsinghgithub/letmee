const mongoose = require("mongoose")
const contactSchema = new mongoose.Schema({
    name:
        { type: String },
    email:
        { type: String },
    phone_number:
        { type: Number },
    subject:
        { type: String },
    descripition:
        { type: String }
}, { timestamps: true })
const contactUs = mongoose.model("contactUs", contactSchema)
module.exports = contactUs