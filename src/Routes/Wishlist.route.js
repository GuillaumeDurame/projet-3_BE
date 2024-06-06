"use strict";
const express = require("express");
const router = express.Router();
const Wishlist = require("../Models/Wishlist");
const protectionMiddleware = require("../middlewares/protection.middleware");
const MiniFig = require("../Models/Minifig");
const Set = require("../Models/Set");
const InventoryPart = require("../Models/InventoryPart");

// Middleware de protection pour vérifier l'authenticité de l'utilisateur avant d'accéder aux routes de la wishlist
router.use(protectionMiddleware);

// Route GET pour récupérer la wishlist de l'utilisateur connecté
router.get("/", async (req, res) => {
  try {
    // Trouve la wishlist de l'utilisateur connecté et populate les champs "sets", "minifigs" et "invParts" avec les documents correspondants
    const wishlist = await Wishlist.findOne({ owner: req.user.id }).populate([
      { path: "sets", model: Set },
      { path: "minifigs", model: MiniFig },
      { path: "invParts", model: InventoryPart },
    ]);
    res.json(wishlist);
  } catch (err) {
    // En cas d'erreur renvoi de l'erreur
    res.send(err);
  }
});

// Route POST pour créer une nouvelle wishlist pour l'utilisateur connecté
router.post("/", async (req, res) => {
  const { name, description } = req.body;
  try {
    // Vérifie si une wishlist existe déjà pour l'utilisateur connecté
    const existingWishlist = await Wishlist.findOne({ owner: req.user.id });
    if (existingWishlist) {
      // En cas d'erreur, envoi de l'erreur
      res.send(err);
    }

    // Crée une nouvelle wishlist
    const newWishlist = new Wishlist({
      owner: req.user.id,
      name,
      description,
      invParts: [],
      minifigs: [],
      sets: [],
    });
    // Enregistre la nouvelle wishlist dans la base de données
    await newWishlist.save();
    // Renvoyer une réponse avec un message de succès et la nouvelle wishlist
    res.json({ message: "Wishlist created", wishlist: newWishlist });
  } catch (err) {
    console.log(err);
    // En cas d'erreur, envoi de l'erreur
    res.send(err);
  }
});

// Route PUT pour ajouter un élément à la wishlist
router.put("/add", async (req, res) => {
  const { elementCollection, elementId } = req.body;
  try {
    // Trouve la wishlist de l'utilisateur connecté
    const wishlist = await Wishlist.findOne({ owner: req.user.id });
    if (!wishlist) {
      // En cas d'erreur, envoi de l'erreur
      res.send(err);
    }

    // Ajoute l'élément spécifié à la collection appropriée de la wishlist
    wishlist[elementCollection].push(elementId);
    // Enregistre les modifications dans la base de données
    await wishlist.save();
    // Renvoie la wishlist mise à jour
    res.json(wishlist);
  } catch (err) {
    // En cas d'erreur renvoi de l'erreur
    res.send(err);
  }
});

// Route PUT pour supprimer un élément de la wishlist
router.put("/remove", async (req, res) => {
  const { elementCollection, elementId } = req.body;
  try {
    // Trouve la wishlist de l'utilisateur connecté
    const wishlist = await Wishlist.findOne({ owner: req.user.id });
    if (!wishlist) {
    // En cas d'erreur renvoi de l'erreur
    res.send(err); 
    }

    // Supprime l'élément spécifié de la collection appropriée de la wishlist
    wishlist[elementCollection] = wishlist[elementCollection].filter(
      (id) => id.toString() !== elementId
    );
    // Enregistre les modifications dans la base de données
    await wishlist.save(); 
    res.json();
  } catch (err) {
    // En cas d'erreur renvoi de l'erreur
    res.send(err);
  }
});

// Route DELETE pour supprimer toutes les wishlists de l'utilisateur connecté
router.delete("/all", async (req, res) => {
  try {
    // Supprime toutes les wishlists de l'utilisateur connecté
    await Wishlist.deleteMany({ owner: req.user.id }); 
    res.json(); 
  } catch (err) {
    // En cas d'erreur renvoi de l'erreur
    res.send(err);
  }
});

module.exports = router;
