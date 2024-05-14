const mongoose = require("mongoose")
const notificationModel = require("../model/notificationModel")
const session = require("express-session")

module.exports = {
    createNotification: async (req, res) => {
        try {
            const data = await notificationModel.create({
                senderId: req.body.senderId,
                receiverId: req.body.receiverId,
                notification_type: req.body.notification_type,
                notification_message: req.body.notification_message,
                is_read: req.body.is_read
            })
            return res.json({
                message: "create notification",
                status: 200,
                body: data
            })
        } catch (error) {
            console.log(error, "error");
        }
    },

    notificationPage: async (req, res) => {
        try {
            if (!req.session.users) {
                return res.redirect("/loginPage")
            }
            const notificationData = await notificationModel.find().populate(['senderId', 'receiverId'])
          
            res.render("notification/notification", { session: req.session.users, notificationData })
        } catch (error) {
            console.log(error, "error");
        }
    },

    notificationView: async (req, res) => {
        try {

         
            if (!req.session.users) {
                return res.redirect("/loginPage")
            }
            const Data = await notificationModel.findOne({ _id: req.params.id }).populate(['senderId', 'receiverId'])
            res.render("notification/notificationView", { session: req.session.users, Data })
        } catch (error) {
            console.log(error, "error");
        }
    },

}