const mongoose = require("mongoose")
const userModel = require("../model/usersModel")
const bcrypt = require("bcrypt")
const { tokenGenerate } = require("../middleWare/jwt")
const { Validator } = require("node-input-validator")
const { imageupload, checkValidation } = require("../middleWare/helper")
const session = require("express-session")
const saltRound = 10


module.exports = {
    signup: async (req, res) => {
        try {
            const v = new Validator(req.body, {
                name: "required",
                email: "required",
                password: "required"
            })
            let errorResponse = await checkValidation(v)
            if (errorResponse) {
                return res.json({
                    success: false,
                    status: 404,
                    message: errorResponse,
                    body: {}
                })
            }
            const email = await userModel.findOne({
                email: req.body.email,
            })
            if (email) {
                return res.json({
                    success: false,
                    status: 400,
                    message: "email already exist",
                    body: {}
                })
            }
            if (req.files && req.files.image.name) {
                const image = req.files.image;
                if (image) req.body.image = imageupload(image, "userImage");
            }
            const password = await bcrypt.hash(req.body.password, saltRound)
            const data = await userModel.create({
                name: req.body.name,
                role: req.body.role,
                email: req.body.email,
                support_email: req.body.support_email,
                password: password,
                phone_number: req.body.phone_number,
                image: req.body.image,
                gender: req.body.gender,
                social_type: req.body.social_type,
                social_id: req.body.social_id,
                is_account_verified: req.body.is_account_verified,
                otp: req.body.otp,
                is_otp_verified: req.body.is_otp_verified,
                commision: req.body.commision,
                address: req.body.address,
                status: req.body.status
            })

            const token = await tokenGenerate(data._id)
            const updateResult = await userModel.findByIdAndUpdate({
                _id: data._id
            }, { token: token.token, logintime: token.time }, { new: true })

            return res.json({
                success: true,
                status: 200,
                message: "user created",
                body: updateResult
            })
        } catch (error) {
            console.log(error, "error");
            return res.json({
                success: false,
                status: 400,
                message: "error user not created",

            })
        }
    },
    getUserPage: async (req, res) => {
        try {
            if (!req.session.users) {
                res.redirect("/loginPage")
            }
            let Data = await userModel.find({ role: 1 })
            res.render("users/user.ejs", { session: req.session.users, Data })
        } catch (error) {
            console.log(error)

        }
    },
    userViewPage: async (req, res) => {
        try {
            if (!req.session.users) {
                return res.redirect("/loginPage")
            }
            let Data = await userModel.findOne({ _id: req.params.id })
            res.render("users/userView", { session: req.session.users, Data })
        } catch (error) {
            console.log(error, "error");
        }
    },
    userStatus: async (req, res) => {
        try {
            const data = await userModel.findByIdAndUpdate({
                _id: req.params.id
            }, { status: req.body.status }, { new: true })
            return res.status(200).json({
                code: 200,
                msg: req.flash("msg", "Status update successfully"),
            });
        } catch (error) {
            console.log(error, "error");
        }
    },


}