const mongoose = require("mongoose");
const { Router } = require("express");
const router = Router();
const { TOKEN_SECRET } = require("../const");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const protectionMiddleware = require("../middlewares/protection.middleware");

// Route POST pour l'inscription d'un nouvel utilisateur
router.post("/signup", async (req, res) => {
  const { username, email, password, description, favThemes } = req.body;

  // Génération d'un salt pour le hachage du mot de passe
  const salt = await bcrypt.genSalt();

  // Hachage du mot de passe avec le salt
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    // Création d'un nouvel utilisateur avec les informations fournies
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      description,
      favThemes,
    });

    // Envoi de la réponse avec le nouvel utilisateur créé
    res.status(201).json(newUser);
  } catch (err) {
    // En cas d'erreur, envoi de l'erreur
    res.send(err);
  }
});

// Route POST pour la connexion d'un utilisateur
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Recherche de l'utilisateur par email
    const user = await User.findOne({ email });

    // Vérification des informations d'identification
    const isCorrectCredentials =
      user != null && (await bcrypt.compare(password, user.password));

    if (!isCorrectCredentials) {
      // Si les informations d'identification sont incorrectes, envoi d'une réponse avec le statut 401
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Création d'un token JWT
    const authToken = jwt.sign({ email }, TOKEN_SECRET, {
      algorithm: "HS256",
      issuer: "P3",
      expiresIn: "7d",
    });

    // Envoi de la réponse avec le token d'authentification
    res.json({ authToken });
  } catch (err) {
    // En cas d'erreur, envoi de l'erreur
    res.send(err);
  }
});

// Middleware de protection pour sécuriser les routes suivantes
router.use(protectionMiddleware);

// Route GET pour récupérer les informations de l'utilisateur connecté
router.get("/me", async (req, res) => {
  try {
    // Envoi de la réponse avec les informations de l'utilisateur
    res.send(req.user);
  } catch (err) {
    // En cas d'erreur, envoi de l'erreur
    res.send(err);
  }
});

// Route PUT pour mettre à jour les informations de l'utilisateur connecté
router.put("/me", async (req, res) => {
  try {
    const _id = req.user.id;

    // Mise à jour des informations de l'utilisateur
    const UpdateRequest = await User.findByIdAndUpdate(_id, req.body);
    // Envoi de la réponse avec les informations mises à jour
    res.send(UpdateRequest);
  } catch (err) {
    // En cas d'erreur, envoi de l'erreur
    res.send(err);
  }
});

// Route DELETE pour supprimer le compte de l'utilisateur connecté
router.delete("/me", async (req, res) => {
  try {
    console.log(req.user.id);
    // Suppression de l'utilisateur par ID
    const DeleteRequest = await User.findByIdAndDelete(req.user.id);
    // Envoi de la réponse avec les informations de la suppression
    res.send(DeleteRequest);
  } catch (err) {
    // En cas d'erreur, envoi de l'erreur
    res.send(err);
  }
});

// Exportation du routeur pour utilisation dans d'autres parties de l'application
module.exports = router;
