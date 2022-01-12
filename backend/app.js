const express = require('express'); // On importe express
const app = express();

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauces');
const path = require('path');

app.use(express.json()); //MIDDELWARE QUI PERMET D'EXTRAIRE LES CORPS JSON

// CREATION D'UN MIDDLEWARE QUI AJOUTE DES HEADERS AUX OBJETS REPONSE POUR AUTHORISER L'ACCES (s'applique à toutes les routes) = évite les erreurs CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Header qui permet d'acceder à l'API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Header qui permet d'ajouter les headers mentionnés aux requêtes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Header qui permet d'envoyer des requêtes avec les méthodes mentionnées 
    next(); 
  });  

const mongoose = require('mongoose'); // On importe mongoose dans le fichier app.js

// On connect l'API à la base de données MongoDB
mongoose.connect('mongodb+srv://Julien:x5GLRje5hZuWxKn@piiquante.grics.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use('/images', express.static(path.join(__dirname, 'images'))); // Gestion de la ressource images de manière statique
app.use('/api/auth', userRoutes); // On importe les logiques à exécuter (/api/auth/) et la route à utiliser (userRoutes)
app.use('/api/sauces', sauceRoutes); // On importe les logiques à exécuter (/api/sauces/) et la route à utiliser (sauceRoutes)

module.exports = app;