const { authRouter } = require("./auth.route")
const { compteRouter } = require("./compte.route")
const { achatRouter } = require("./achat.route")
const { virementRouter } = require("./virement.route")
const { adminRouter } = require("./admin.route")

module.exports = {
    authRouter,
    compteRouter,
    achatRouter,
    virementRouter,
    adminRouter
}