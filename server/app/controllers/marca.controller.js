const { marcas } = require("../models");
const db = require("../models");
const Marca = db.marcas;

// Create and Save a new Marca
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nombre) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Marca
  const object = new Marca(req.body);

  // Save Marca in the database
  object
    .save(object)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Marca."
      });
    });
};

exports.import = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const data = req.body;

  Marca.insertMany(data).then(marcas => {
    res.send(marcas);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating productos."
    });
  })
};

// Retrieve all Marcas from the database.
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  const limit = req.query.limit ? Number(req.query.limit) : 10;
  const skip = req.query.skip ? Number(req.query.skip) : 0;
  let condition = nombre ? { nombre: { $regex: new RegExp(nombre), $options: "i" } } : {};

  Marca.find(condition)
    .limit(limit)
    .skip(skip)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Marcas."
      });
    });
};

// Find a single Marca with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Marca.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Marca with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Marca with id=" + id });
    });
};

// Update a Marca by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Marca.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Marca with id=${id}. Maybe Marca was not found!`
        });
      } else res.send({ message: "Marca was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Marca with id=" + id
      });
    });
};

// Delete a Marca with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Marca.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Marca with id=${id}. Maybe Marca was not found!`
        });
      } else {
        res.send({
          message: "Marca was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Marca with id=" + id
      });
    });
};

// Count all of Marca
exports.count = (req, res) => {
  let condition = {};

  Marca.count(condition)
    .then(total => {
      res.send({ total: total })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message
      });
    });
}
