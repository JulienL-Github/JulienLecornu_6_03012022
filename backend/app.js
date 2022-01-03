const express = require('express');

const app = express();

app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !!' }); 
});

module.exports = app;


// IMPORT ET PARAMETRAGE MOOGOOSE //
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Julien:x5GLRje5hZuWxKn@piiquante.grics.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));