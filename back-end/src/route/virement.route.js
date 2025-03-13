const { isValidDataObject } = require("../controller/check")
const { userModel, virementModel, compteModel } = require("../database/model.db")

const virementRouter = require('express').Router()

virementRouter.get("/", (req, res) => {
    const token = req.headers.authorization || ""
    const currentUser = decodeToken(token)
    const currentCompte = {
        _id: req.body.compte || ""
    }
    if (!isValidDataObject(currentCompte)) {
        return res.status(400).send({ message: "compte missing" })
    }
    userModel.findOne(currentUser).then(user => {
        if (!user) {
            return res.status(400).send({ message: "user not found" })
        } else {
            compteModel.findOne(currentCompte).then(compte => {
                if (!compte) {
                    return res.status(400).send({ message: "compte not found" })
                } else if (compte.utilisateur != currentUser._id) {
                    return res.status(400).send({ message: "not your compte" })
                } else {
                    virementModel.find({expediteur:currentCompte._id}).populate({ path: "expediteur", select: "numeroCompte" }).then(virements => {
                        return res.status(200).send(virements)
                    })
                }
            })
        }
    })
})

module.exports = {
    virementRouter
}