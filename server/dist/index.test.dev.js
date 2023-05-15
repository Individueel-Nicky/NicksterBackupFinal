"use strict";

var express = require('express');

var request = require('supertest');

var _require = require('./index'),
    app = _require.app,
    closeServer = _require.closeServer,
    sequelize = _require.sequelize;

var crypto = require('crypto');

function generateRandomWord(length) {
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

function addPlaylist(playlist) {
  var id, name, description, newPlaylist;
  return regeneratorRuntime.async(function addPlaylist$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = playlist.id, name = playlist.name, description = playlist.description;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(Playlist.create({
            id: id,
            name: name,
            description: description
          }));

        case 4:
          newPlaylist = _context.sent;
          console.log("Added new playlist: ".concat(newPlaylist.name));
          return _context.abrupt("return", newPlaylist);

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          console.error('Error adding playlist:', _context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 9]]);
}

describe('POST /addPlaylist', function () {
  afterEach(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(closeServer());

          case 2:
            _context2.next = 4;
            return regeneratorRuntime.awrap(sequelize.close());

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
  test('should add a playlist to the database', function _callee2() {
    var playlist, response;
    return regeneratorRuntime.async(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            playlist = {
              id: generateRandomWord(10),
              name: 'Test Playlist',
              description: 'A test playlist'
            };
            _context3.next = 3;
            return regeneratorRuntime.awrap(request(app).post('/addPlaylist').send(playlist).set('Accept', 'application/json'));

          case 3:
            response = _context3.sent;
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('id', playlist.id);
            expect(response.body).toHaveProperty('name', 'Test Playlist');
            expect(response.body).toHaveProperty('description', 'A test playlist');

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
});
module.exports = app;