const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123456789',
    database: 'spotifyplaylistdb',
});

app.post('/addPlaylist', (req, res) => {
    console.log('Received data:', req.body);
    const {id, name, description} = req.body;

    const sql = 'INSERT INTO playlists (id, name, description) VALUES (?, ?, ?)';
    const values = [id, name, description];

    connection.query(sql, values, (error, results) => {
        if (error) {
            console.error('Error adding playlist:', error);
            res.status(500).send('Error adding playlist');
        } else {
            console.log('Playlist added:', {id, name, description});
            res.json({id, name, description});
        }
    });
});

app.listen(3001, () => {
    console.log('Server listening on port 3001');
});
