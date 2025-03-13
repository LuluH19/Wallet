const crypto = require("node:crypto")
const { userModel } = require("../database/model.db")
const { isValidEmail, isValidTel, isValidPassword, isValidDataObject } = require('../controller/check')
const { generateToken } = require("../controller/jwt")

const authRouter = require('express').Router()

authRouter.post("/login", (req, res) => {
    const currentUser = {
        email: req.body.email || "",
        password: req.body.password ? crypto.createHash('sha256').update(req.body.password).digest("base64") : ""
    }
    if (!isValidDataObject(currentUser)) {
        return res.status(400).send({ message: "incorrect user format" })
    }
    userModel.findOne({ email: currentUser.email, password: currentUser.password }).then(
        user => {
            if (!user) {
                return res.status(400).send({ message: "user not found" })
            } else {
                return res.status(200).send(generateToken(user))
            }
        }
    )
})

authRouter.post("/register", (req, res) => {
    const currentUser = {
        nom: req.body.nom || "",
        prenom: req.body.prenom || "",
        email: req.body.email || "",
        password: req.body.password ? crypto.createHash('sha256').update(req.body.password).digest("base64") : "",
        telephone: req.body.telephone || "",
        adresse: req.body.adresse || "",
        dateNaissance: req.body.dateNaissance || "",
        role: "client"
    }
    if (!isValidDataObject(currentUser)) {
        return res.status(400).send({ message: "incorrect user format" })
    }
    if (!isValidEmail(currentUser.email)) {
        return res.status(400).send({ message: "incorrect mail format" })
    }
    if (!isValidPassword(req.body.password)) {
        return res.status(400).send({ message: "incorrect password format" })
    }
    if (!isValidTel(currentUser.telephone)) {
        return res.status(400).send({ message: "incorrect telephone format" })
    }
    userModel.findOne({ email: req.body.email }).then(
        data => {
            if (!data) {
                userModel.create(currentUser).then(
                    (user) => {
                        return res.send(generateToken(user))
                    }
                )
            } else {
                return res.status(404).send({ message: "already exist" })
            }
        }
    )
})

module.exports = {
    authRouter
}