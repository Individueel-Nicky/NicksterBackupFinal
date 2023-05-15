"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var express = require('express');

var bodyParser = require('body-parser');

var cors = require('cors');

var _require = require('sequelize'),
    Sequelize = _require.Sequelize,
    Model = _require.Model,
    DataTypes = _require.DataTypes;

var sequelize = new Sequelize('spotifyplaylistdb', 'root', '123456789', {
  host: '127.0.0.1',
  dialect: 'mysql'
});
var app = express();
app.use(cors());
app.use(bodyParser.json());

var Playlist =
/*#__PURE__*/
function (_Model) {
  _inherits(Playlist, _Model);

  function Playlist() {
    _classCallCheck(this, Playlist);

    return _possibleConstructorReturn(this, _getPrototypeOf(Playlist).apply(this, arguments));
  }

  return Playlist;
}(Model);

Playlist.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  }
}, {
  sequelize: sequelize,
  modelName: 'Playlist',
  tableName: 'playlists',
  timestamps: false
});
app.post('/addPlaylist', function _callee(req, res) {
  var _req$body, id, name, description, playlist;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log('Received data:', req.body);
          _req$body = req.body, id = _req$body.id, name = _req$body.name, description = _req$body.description;
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(Playlist.create({
            id: id,
            name: name,
            description: description
          }));

        case 5:
          playlist = _context.sent;
          console.log('Playlist added:', playlist.toJSON());
          res.json(playlist.toJSON());
          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](2);
          console.error('Error adding playlist:', _context.t0);

          if (_context.t0.name === 'SequelizeValidationError') {
            res.status(400).json({
              message: 'Invalid playlist name'
            });
          } else {
            res.status(500).send('Error adding playlist');
          }

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 10]]);
});
module.exports = {
  app: app,
  closeServer: server.close,
  sequelize: sequelize
};
var server = app.listen(3001, function _callee2() {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log('Server listening on port 3001');
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(sequelize.authenticate());

        case 4:
          console.log('Database connection has been established successfully.');
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](1);
          console.error('Unable to connect to the database:', _context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 7]]);
});