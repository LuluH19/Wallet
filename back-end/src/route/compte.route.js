const { userModel, compteModel } = require("../database/model.db")
const { isValidDataObject } = require('../controller/check')
const { decodeToken } = require("../controller/jwt")

const compteRouter = require('express').Router()

compteRouter.get("/", async (req, res) => {
    const token = req.headers.authorization || ""
    const currentUser = decodeToken(token)
    userModel.findOne(currentUser).then(user => {
        if (!user) {
            return res.status(400).send({ message: "user not found" })
        } else {
            compteModel.find(currentCompte).then(comptes => {
                return res.send(comptes)
            })
        }
    })
})

compteRouter.post("/create", async (req, res) => {
    const token = req.headers.authorization || ""
    const currentUser = decodeToken(token)
    const currentCompte = {
        utilisateur: currentUser.id || "",
        devise: req.body.devise || "EUR",
        solde: req.body.sold || 0,
        numeroCompte: req.body.numeroCompte || ""
    }
    if (!isValidDataObject(currentCompte)) {
        return res.status(400).send({ message: "incorrect compte format" })
    }
    userModel.findOne(currentUser).then(user => {
        if (!user) {
            return res.status(400).send({ message: "user not found" })
        } else {
            compteModel.create(currentCompte).then(() => {
                return res.send({ message: "compte created" })
            })
        }
    })
})

compteRouter.delete("/delete", async (req, res) => {
    const token = req.headers.authorization || ""
    const currentUser = decodeToken(token)
    const currentCompte = {
        _id: req.body.compte || ""
    }
    if (!isValidDataObject(currentCompte)) {
        return res.status(400).send({ message: "incorrect compte format" })
    }
    userModel.findOne(currentUser).then(user => {
        if (!user) {
            return res.status(400).send({ message: "user not found" })
        } else {
            compteModel.findOne(currentCompte).then(compte => {
                if (!compte) {
                    return res.status(400).send({ message: "compte not found" })
                } else if (compte.utilisateur != currentUser.id) {
                    return res.status(400).send({ message: "not your compte" })
                } else {
                    compte.findOneAndDelete(currentCompte).then(() => {
                        return res.status(200).send({ message: "compte deleted" })
                    })
                }
            })
        }
    })
})

module.exports = {
    compteRouter
}