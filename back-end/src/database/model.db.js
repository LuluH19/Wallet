const { default: mongoose } = require("mongoose")
const { db_url } = require("../constant/config.const")
const { userSchema, compteSchema, achatSchema, virementSchema } = require("./schema.db");

mongoose.connect(db_url)
    .then(() => console.log('Connecté avec succès à MongoDB'))
    .catch((err) => console.error('Erreur lors de la connexion à MongoDB :', err));

const userModel = mongoose.model("User", userSchema);
const compteModel = mongoose.model("Compte", compteSchema);
const achatModel = mongoose.model("Achat", achatSchema);
const virementModel = mongoose.model("Virement", virementSchema);
    
module.exports = {
    userModel,
    compteModel,
    achatModel,
    virementModel
};