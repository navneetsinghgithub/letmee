const { success } = require("../middleWare/helper");
const contactUsModel = require("../model/contactUsModel")

module.exports = {
    createContactUs: async (req, res) => {
        try {
            const data = await contactUsModel.create({
                name: req.body.name,
                email: req.body.email,
                phone_number: req.body.phone_number,
                subject: req.body.subject,
                descripition: req.body.descripition
            })
            return res.json({
                success: true,
                status: 200,
                message: "created contact us",
                body: data
            })
        } catch (error) {
            console.log(error, "error");
        }
    },

    contactUsPage: async (req, res) => {
        try {
            if (!req.session.users) {
                return res.redirect("/loginPage")
            }
            const contactUsData = await contactUsModel.find()
            res.render("contactUs/contactUs.ejs", { session: req.session.users, contactUsData })
        } catch (error) {
            console.log(error, "error");
        }
    },
    contactUsView: async (req, res) => {
        try {
            if (!req.session.users) {
                return res.redirect("/loginPage")
            }
            const Data = await contactUsModel.findOne({ _id: req.params.id })
            res.render("contactUs/contactUsView.ejs", { session: req.session.users, Data })
        } catch (error) {
            console.log(error, "error");
        }
    },
}