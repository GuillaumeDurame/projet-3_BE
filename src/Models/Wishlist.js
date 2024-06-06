const mongoose = require("mongoose");

// Définition du schéma pour les wishlists
const WishListSchema = new mongoose.Schema({

  // Propriétaire de la wishlist, référence au modèle User
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  // Description de la wishlist, longueur maximale de 300 caractères
  description: {
    type: String,
    maxLength: 300,
  },

  // Liste des pièces d'inventaire dans la wishlist, référence au modèle InventoryPart
  invParts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InventoryPart",
    },
  ],

  // Liste des minifigs dans la wishlist, référence au modèle Minifig
  minifigs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Minifig",
    },
  ],

  // Liste des sets dans la wishlist, référence au modèle Set
  sets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Set",
    },
  ],
});

// Création du modèle Wishlist basé sur le schéma WishListSchema
const Wishlist = mongoose.model("Wishlist", WishListSchema);

// Exportation du modèle Wishlist pour utilisation dans d'autres parties de l'application
module.exports = Wishlist;
