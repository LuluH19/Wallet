const { userModel, achatModel, compteModel } = require("../database/model.db")

const achatRouter = require('express').Router()

achatRouter.get("/", (req, res) => {
    const token = req.headers.authorization || ""
    const currentUser = decodeToken(token)
    userModel.findOne(currentUser).then(user => {
        if (!user) {
            return res.status(400).send({ message: "user not found" })
        } else {
            achatModel.find(currentCompte).populate({ path: "compte", select: "numeroCompte" }).then(achats => {
                return res.send(achats)
            })
        }
    })
})

achatRouter.post("/add", (req, res) => {
    const token = req.headers.authorization || ""
    const currentUser = decodeToken(token)
    const curentAchat = {
        compte: req.body.compte || "",
        montant: req.body.montant || "",
        devise: req.body.devise || "EUR",
        description: req.body.description || "",
        date: req.body.date || new Date()
    }
    if (!isValidDataObject(curentAchat)) {
        return res.status(400).send({ message: "incorrect achat format" })
    }
    userModel.findOne(currentUser).then(user => {
        if (!user) {
            return res.status(400).send({ message: "user not found" })
        } else {
            compteModel.findOne(curentAchat).then(compte => {
                if (!compte) {
                    return res.status(400).send({ message: "compte not found" })
                } else if (compte.utilisateur != currentUser._id) {
                    return res.status(400).send({ message: "not your compte" })
                } else {
                    compteModel.findOneAndUpdate(
                        { _id: curentAchat },
                        { solde: compte.solde - curentAchat.montant }).then(() => {
                            achatModel.create(curentAchat).then(() => {
                                return res.status(200).send({ message: "achat added" })
                            })
                        })
                }
            })
        }
    })
})

module.exports = {
    achatRouter
}