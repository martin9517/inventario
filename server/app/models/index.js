const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.marcas = require("./marca.model.js")(mongoose);
db.productos = require("./producto.model.js")(mongoose);
db.bonificaciones = require("./bonificacion.model.js")(mongoose);

module.exports = db;
