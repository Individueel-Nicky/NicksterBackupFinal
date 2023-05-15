const express = require('express');
const request = require('supertest');
const { app, closeServer, sequelize } = require('./index'); 
const crypto = require('crypto');

function generateRandomWord(length) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

async function addPlaylist(playlist) {
   
    const { id, name, description } = playlist;
    try {
      const newPlaylist = await Playlist.create({ id, name, description });
      console.log(`Added new playlist: ${newPlaylist.name}`);
      return newPlaylist;
    } catch (error) {
      console.error('Error adding playlist:', error);
    }
  }

  describe('POST /addPlaylist', () => {
    afterEach(async () => {
      await closeServer(); // Close the server
      await sequelize.close();
    });

  test('should add a playlist to the database', async () => {
    const playlist = {
      id: generateRandomWord(10),
      name: 'Test Playlist',
      description: 'A test playlist',
    };

    const response = await request(app)
      .post('/addPlaylist')
      .send(playlist)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', playlist.id);
    expect(response.body).toHaveProperty('name', 'Test Playlist');
    expect(response.body).toHaveProperty('description', 'A test playlist');
  });
});

module.exports = app;
