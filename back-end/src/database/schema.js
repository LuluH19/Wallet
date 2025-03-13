const { mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    nom: { type: String, required: true, trim: true },
    prenom: { type: String, required: true, trim: true },
    email: { type: String, required: true, minLength: 6, maxLength: 30, trim: true, match: /[a-zA-Z0-9._\-]{1,30}[@][a-zA-Z0-9._\-]{4,12}[.]{1}[a-zA-Z]{2,4}/gm },
    password: { type: String, required: true, trim: true },
    telephone: { type: String, required: true, minLength: 10, maxLength: 10, match: /^0[1-9]\d{8}$/, trim: true },
    adresse: { type: String, required: true, trim: true },
    dateNaissance: { type: Date, required: true },
    role: { type: String, enum: ["client", "admin"], default: "client" },
}, { versionKey: false });

const compteSchema = new mongoose.Schema({
    utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    solde: { type: Number, required: true, min: 0 },
    devise: { type: String, default: "EUR", trim: true },
    numeroCompte: { type: String, unique: true, required: true },
    dateOuverture: { type: Date, default: Date.now }
}, { versionKey: false });

const achatSchema = new mongoose.Schema({
    compte: { type: mongoose.Schema.Types.ObjectId, ref: 'Compte', required: true },
    montant: { type: Number, required: true, min: 0 },
    devise: { type: String, default: "EUR", trim: true },
    description: { type: String, required: true, trim: true },
    date: { type: Date, default: Date.now }
}, { versionKey: false });

const virementSchema = new mongoose.Schema({
    expediteur: { type: mongoose.Schema.Types.ObjectId, ref: 'Compte', required: true },
    destinataire: { type: mongoose.Schema.Types.ObjectId, ref: 'Compte', required: true },
    montant: { type: Number, required: true, min: 0 },
    devise: { type: String, default: "EUR", trim: true },
    date: { type: Date, default: Date.now },
    statut: { type: String, enum: ["en attente", "effectué", "échec"], default: "en attente" }
}, { versionKey: false });

module.exports = {
    userSchema,
    compteSchema,
    achatSchema,
    virementSchema
};