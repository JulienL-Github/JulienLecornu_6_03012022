const express = require('express'); // On importe express
const router = express.Router(); // On créé le router

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);



module.exports = router; // On exporte le router de ce fichier