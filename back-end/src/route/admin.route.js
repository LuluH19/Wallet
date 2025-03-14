const { userModel, achatModel, compteModel, virementModel } = require("../database/model.db")

const adminRouter = require('express').Router()

adminRouter.get("/", (req, res)=>{  
    return res.send("admin")
})

module.exports = {
    adminRouter
}