const { authRouter } = require("./auth.route")
const { compteRouter } = require("./compte.route")
const { achatRouter } = require("./achat.route")
const { virementRouter } = require("./virement.route")

module.exports = {
    authRouter,
    compteRouter,
    achatRouter,
    virementRouter
}