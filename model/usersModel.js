const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name:
        { type: String },
    role:
        { type: Number, enum: [0, 1, 2], default: 1 },   //admin = 0 , user = 1  , creater=2
    email:
        { type: String },
    password:
        { type: String },
    phone_number:
        { type: Number },
    image:
        { type: String },
    gender:
        { type: Number, enum: [1, 2], default: 1 },  ///male =1 , female=2
    social_type:
        { type: Number, enum: [1, 2, 3], default: 1 }, //google=1 , fb=2 , apple = 3
    social_id:
        { type: String },
    is_account_verified:
        { type: Number, enum: [0, 1], default: 0 }, //pending = 0 , verified =1
    otp:
        { type: Number },
    is_otp_verified:
        { type: Number, enum: [0, 1], default: 0 },//unverified = 0 , verified=1
    address:
        { type: String },
    support_email:
        { type: String },
    commision:
        { type: String },
    status:
        { type: String },  //inactive = 0 , active = 1
    token:
        { type: String },
    logintime:
        { type: Number }
}, { timestamps: true })

const user = mongoose.model("user", userSchema)
module.exports = user






