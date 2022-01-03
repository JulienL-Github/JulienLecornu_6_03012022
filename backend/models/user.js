const mongoose = require('mongoose'); // ON IMPORTE MONGOOSE
const uniqueValidator = require('mongoose-unique-validator'); // On ajoute le "validateur" comme pluggin à notre schéma (pour être sûr qu'on ne puisse pas s'inscire plusieurs fois avec la même adresse mail)

// CREATION DU SCHEMA DE DONNÉES
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator); //On applique le validateur au schéma

module.exports = mongoose.model('user', userSchema); // On exporte ce schéma sous forme de modèle