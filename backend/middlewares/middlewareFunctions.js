const mongoose = require('../db/mongo_connection')
const mongoSchemaModel = require('../models/schema')
require("dotenv").config();
const Schema = mongoose.Schema;
const msgObject = require('../responseeMsg.json')




module.exports = middlewareFunctions = {

    checkAuth: (req, res, next) => {
        try {
            console.log("header : ", req.headers.authorization_key)
            if (req.headers.authorization_key == process.env.API_KEY) {
                next()
            } else {
                res.json({
                    operation: msgObject.failed,
                    result: null,
                    errorMsg: 'Invaild User'
                })
            }
        } catch (error) {
            res.json({
                operation: msgObject.failed,
                result: null,
                errorMsg: error
            })
        }

    },


    verifying: (req, res, next) => {
        try {
            console.log('verifying : ', req.body)
            let AdminModel = mongoSchemaModel.AdminModel(req.body.ADMIN_USERNAME)
            AdminModel.find({}, (err, x) => {
                console.log("user data : ", x)
                if (x.length > 0) {
                    res.json({
                        operation: msgObject.failed,
                        result: x,
                        errorMsg: msgObject.userAlreadyExist
                    })
                } else {

                    next()
                }
            }).limit(2)

        } catch (error) {
            console.log("error : ", error)
            res.json({
                operation: msgObject.failed,
                result: null,
                errorMsg: error
            })
        }
    },
    vaildateMember: (req, res, next) => {
        try {
            console.log('vaildateMember : ', req.body, msgObject)
            let AdminModel = mongoSchemaModel.AdminModel(req.body.COMPANY_PARENT_USERNAME)

            AdminModel.find({ ADMIN_USERNAME: req.body.COMPANY_PARENT_USERNAME, ADMIN_ID: req.body.COMPANY_PARENT_ID }, (err, x) => {
                console.log("user data : ", x)
                if (x.length == 1) {
                    const CompanyModel = mongoSchemaModel.CompanyModel(req.body.COMPANY_PARENT_USERNAME)

                    CompanyModel.find({ COMPANY_USERNAME: req.body.COMPANY_USERNAME }, (error, re) => {
                        if (re.length > 0) {
                            res.json({
                                operation: msgObject.failed,
                                result: x,
                                errorMsg: msgObject.memberAlreadyExist
                            })
                        } else {

                            next()
                        }
                    })
                } else {
                    res.json({
                        operation: msgObject.failed,
                        result: x,
                        errorMsg: msgObject.invalid
                    })

                }
            })
        } catch (error) {
            res.json({
                operation: msgObject.failed,
                result: null,
                errorMsg: error
            })
        }
    },


}

