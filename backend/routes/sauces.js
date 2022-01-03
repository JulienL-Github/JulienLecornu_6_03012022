const express = require('express'); //On importe express
const router = express.Router(); // Création d'un router avec les méthodes express

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

const sauceCtrl = require('../controllers/sauces');

router.post('/', auth, multer, sauceCtrl.createSauce); // AJOUT D'UNE ROUTE POST POUR AJOUTER UNE NOUVELLE SAUCE
router.put('/:id', auth, sauceCtrl.modifySauce); // AJOUT D'UNE ROUTE PUT POUR QUE L'UTILISATEUR PUISSE MODIFIER UNE SAUCE
router.delete('/:id', auth, sauceCtrl.deleteSauce); // AJOUT D'UNE ROUTE DELETE POUR QUE L'UTILISATEUR PUISSE SUPPRIMER UNE SAUCE
router.get('//:id', auth, sauceCtrl.getOneSauce); // AJOUT D'UNE ROUTE GET QUI RECUPERE UNE SAUCE SPECIFIQUE
router.get('/', auth, sauceCtrl.getAllSauce); // AJOUT D'UNE ROUTE GET POUR RECUPERER TOUTES LES SAUCES

module.exports = router; // On exporte le router de ce fichier