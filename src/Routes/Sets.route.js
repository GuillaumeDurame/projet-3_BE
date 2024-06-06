const express = require("express");
const router = express.Router();

// Importation du modèle Set
const Set = require("../Models/Set");

// Middleware pour la gestion des erreurs
const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
};

// Route GET pour récupérer les sets avec une pagination
router.get("/", async (req, res, next) => {
  // Récupération des params de pagination de la requête, avec des valeurs par défaut
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 100;
  const skipIndex = (page - 1) * limit;

  try {
    // Récupération des sets avec pagination
    const sets = await Set.find().skip(skipIndex).limit(limit);

    // Comptage du nombre total de documents dans la collection Set
    const totalSets = await Set.countDocuments();

    // Envoi de la réponse avec les sets et le nombre total de sets
    res.json({ sets, totalSets });
  } catch (err) {
    // En cas d'erreur, envoi de l'erreur
    next(err);
  }
});

// Exportation du routeur pour utilisation dans d'autres parties de l'application
module.exports = router;
