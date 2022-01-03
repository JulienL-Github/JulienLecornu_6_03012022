const bcrypt = require('bcrypt'); //On importe le package Bcrypt pour crypter les mots de passe
const User = require ('../models/user'); //On importe notre model User pour pouvoir l'utiliser

const jwt = require('jsonwebtoken');

// AJOUT D'UN CONTROLLER POUR LA CREATION DE NOUVEAUX UTILISATEURS
exports.signup = (req, res, next) => { 
    bcrypt.hash(req.body.password, 10) // On crypte le mot de passe
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save() // On l'enregistre dans la base de donnée 
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

// AJOUT D'UN CONTROLLER POUR CONNECTER UTILISATEURS EXISTANTS
  exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) //Trouver 1 seul utilisateur d'un abonné avec son eMail
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)  
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };