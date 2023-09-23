const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const port = 3000;

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('db.sqlite3');

db.run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY,
    message TEXT
)`, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Table "messages" créée avec succès.');
    }
});

app.get('/', (req, res) => {
    res.send('Bienvenue sur le serveur Express !');
});

app.post('/api/post', (req, res) => {
    const message = req.body.message;

    const query = 'INSERT INTO messages (message) VALUES (?)';
    db.run(query, [message], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Erreur lors de l\'insertion du message.');
        } else {
            res.status(201).send(`Message ajouté avec succès avec l'ID ${this.lastID}`);
        }
    });
});

app.get('/api/data', (req, res) => {
    const query = 'SELECT * FROM messages';

    db.all(query, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Erreur lors de la récupération des messages.');
        } else {
            res.json(rows);
        }
    });
});

app.listen(port, () => {
    console.log(`Le serveur écoute sur le port ${port}`);
});