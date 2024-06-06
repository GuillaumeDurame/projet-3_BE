const mongoose = require("mongoose");

// Définition du schéma pour les utilisateurs
const userSchema = new mongoose.Schema({
  // Nom d'utilisateur
  username: {
    type: String,
    required: [true, "name is required"],
  },

  // Adresse e-mail, doit être unique
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email is already used"],
  },

  // Mot de passe
  password: {
    type: String,
    required: [true, "password is required"],
  },

  // Description de l'utilisateur, longueur maximale de 300 caractères
  description: {
    type: String,
    maxLength: 300,
  },

  // Liste des thèmes favoris de l'utilisateur, référence au modèle Theme
  favThemes: [
    {
      type: Number,
      ref: "Theme",
    },
  ],
});

// Création du modèle User basé sur le schéma userSchema
const User = mongoose.model("User", userSchema);

// Exportation du modèle User pour utilisation dans d'autres parties de l'application
module.exports = User;
