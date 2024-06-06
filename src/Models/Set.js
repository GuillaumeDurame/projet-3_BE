const mongoose = require("mongoose");

// Définition du schéma pour les sets
const setSchema = new mongoose.Schema({
  
  // Nom du set
  name: {
    type: String,
    required: true,
  },

  // Année de sortie du set
  year: {
    type: Number,
    required: true,
  },

  // Nombre de pièces dans le set
  num_parts: {
    type: Number,
    required: true,
  },

  // URL de l'image du set
  imag_url: {
    type: String,
    required: true,
  },

  // Référence au thème du set, optionnel
  theme: {
    type: Number,
    ref: "Theme",
  },
});

// Création du modèle Set basé sur le schéma setSchema
const Set = new mongoose.model("Set", setSchema);

// Exportation du modèle Set pour utilisation dans d'autres parties de l'application
module.exports = Set;
