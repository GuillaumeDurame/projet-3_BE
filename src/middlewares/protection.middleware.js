const jwt = require("jsonwebtoken");

// Importation de la clé secrète
const { TOKEN_SECRET } = require("../const");

// Importation du modèle User
const User = require("../Models/User");

// Middleware de protection des routes
async function protectionMiddleware(req, res, next) {
  try {
    // Récupération du token JWT
    const token = req.headers.authorization?.split(" ")[1];

    // Vérification de la présence du token
    if (!token) {
      res.status(401).json({ message: "Missing Bearer Token" });
      return;
    }

    // Vérification et extraction des info utilisateur à partir du token
    const { email } = jwt.verify(token, TOKEN_SECRET);

    // Recherche de l'utilisateur dans la base de données
    const user = await User.findOne({ email: email }, { password: 0 });

    if (!user) {
      res.status(404).json({ message: "User Not Found" });
      return;
    }

    req.user = user;

    // Appel au middleware suivant
    next();
  } catch (err) {
    // Gestion des erreurs
    if (err.name.includes("Token")) {
      // En cas d'erreur de token JWT
      res.status(401).json({ message: "Invalid Token" });
    } else {
      // Transmission de toute autre erreur
      next(err);
    }
  }
}

// Exportation du middleware de protection des routes
module.exports = protectionMiddleware;
