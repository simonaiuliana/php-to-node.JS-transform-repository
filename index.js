// Importer le module Express
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Configure EJS comme moteur de templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Dossier pour les fichiers de vues

// Middleware pour analyser les données du corps des requêtes
app.use(express.urlencoded({ extended: true })); // Pour les données de formulaire encodées en URL
app.use(express.json()); // Pour les données JSON

// Définir le répertoire public contenant les ressources externes (img, CSS, JS,...)
app.use(express.static(path.join(__dirname, 'public')));

// Routes vers les différentes pages
app.get('/', (req, res) => {
    res.render('accueil', { nomPage: 'Accueil' });
});

app.get('/geo', (req, res) => {
    res.render('geographie', { nomPage: 'Géographie' });
});

app.get('/hist', (req, res) => {
    res.render('histoire', { nomPage: 'Histoire' });
});

app.get('/cult', (req, res) => {
    res.render('culture', { nomPage: 'Culture' });
});

app.get('/gal', (req, res) => {
    res.render('galerie', { nomPage: 'Galerie' });
});

app.get('/form', (req, res) => {
    res.render('contact', { nomPage: 'Contact' });
});

app.get('/link', (req, res) => {
    res.render('liens', { nomPage: 'Liens' });
});

// Route POST pour traiter les données du formulaire
app.post('/traitement-formulaire', (req, res) => {
    const { nom, email, message } = req.body;
    // mesage personalise
    const mesajPersonalizat = `Bonjour ${nom}, votre message a été reçu ! Voici ce que vous avez envoyé : "${message}". Nous vous contacterons bientôt à l'adresse email ${email}.`;

    // dates afiché dans la console
    console.log('Nom:', nom);
    console.log('Email:', email);
    console.log('Message:', message);

    // envoy de mesaj personalisé
    res.render('merci', { nom, email, message });
});


// Route pour gérer les erreurs 404
app.use((req, res, next) => {
    res.status(404).render('page-404', { nomPage: 'Erreur 404' });
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

