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
                    virementModel.find({ expediteur: currentCompte._id }).populate({ path: "expediteur", select: "numeroCompte" }).then(virements => {
                        return res.status(200).send(virements)
                    })
                }
            })
        }
    })
})

virementRouter.post("/create", (req, res) => {
    const token = req.headers.authorization || ""
    const currentUser = decodeToken(token)
    const currentVirement = {
        expediteur: req.body.expediteur || "",
        destinataire: req.body.destinataire || "",
        montant: req.body.montant || "",
        devise: req.body.devise || "EUR",
        date: req.body.date || new Date()
    }
    if (!isValidDataObject(currentVirement)) {
        return res.status(400).send({ message: "virement missing" })
    }
    userModel.findOne(currentUser).then(user => {
        if (!user) {
            return res.status(400).send({ message: "user not found" })
        } else {
            compteModel.findOne({ _id: currentVirement.expediteur }).then(expediteur => {
                if (!expediteur) {
                    return res.status(400).send({ message: "expediteur not found" })
                } else if (expediteur.utilisateur != currentUser._id) {
                    return res.status(400).send({ message: "not your compte" })
                } else {
                    compteModel.findOne({ _id: currentVirement.destinataire }).then(destinataire => {
                        if (!destinataire) {
                            return res.status(400).send({ message: "destinataire not found" })
                        } else {
                            if (currentVirement.montant > expediteur.solde) {
                                return res.status(400).send({ message: "not enough money to make the virement" })
                            } else {
                                compteModel.findOneAndUpdate({ utilisateur: currentVirement.expediteur }, { solde: expediteur.solde - currentVirement.montant }).then(() => {
                                    compteModel.findOneAndUpdate({ utilisateur: currentVirement.destinataire }, { solde: destinataire.solde + currentVirement.montant }).then(() => {
                                        virementModel.create(currentVirement).then(()=>{
                                            res.status(200).send({ message: "virement created" })
                                        })
                                    })
                                })
                            }
                        }
                    })
                }
            })
        }
    })
})

module.exports = {
    virementRouter
}