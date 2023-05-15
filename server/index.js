const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('spotifyplaylistdb', 'root', '123456789', {
  host: '127.0.0.1',
  dialect: 'mysql',
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

class Playlist extends Model {}

Playlist.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'Playlist',
  tableName: 'playlists',
  timestamps: false,
});

app.post('/addPlaylist', async (req, res) => {
  console.log('Received data:', req.body);
  const {id, name, description} = req.body;

  try {
    const playlist = await Playlist.create({ id, name, description });
    console.log('Playlist added:', playlist.toJSON());
    res.json(playlist.toJSON());
  } catch (error) {
    console.error('Error adding playlist:', error);
    if (error.name === 'SequelizeValidationError') {
      res.status(400).json({message: 'Invalid playlist name'});
    } else {
      res.status(500).send('Error adding playlist');
    }
  }
});

module.exports = { app, closeServer: server.close, sequelize }; 
const server = app.listen(3001, async () => {
  console.log('Server listening on port 3001');

  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});


