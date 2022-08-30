const db = require("../models");
const Producto = db.productos;
const Bonificacion = db.bonificaciones;

// Create and Save a new Producto
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nombre) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Producto
  const object = new Producto(req.body);

  // Save Producto in the database
  object
    .save(object)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Producto."
      });
    });
};

// Retrieve all Productos from the database.
exports.findAll = (req, res) => {
  const search = req.query.search;
  const limit = req.query.limit ? Number(req.query.limit) : 10;
  const skip = req.query.skip ? Number(req.query.skip) : 0;
  let condition = {};

  if (search) {
    condition['$or'] = [
      {'nombre': { $regex: new RegExp(search), $options: "i" }},
      {'codigo': { $regex: new RegExp(search), $options: "i" }}
    ];
  }

  Producto.find(condition)
    .populate('marca', 'nombre')
    .limit(limit)
    .skip(skip)
    .then(data => {
      Bonificacion.findOne({}).then(bonificacion => {
        if (bonificacion) {
          data.map(item => {
            item.precioBonificado = item.precioUnitario + (item.precioUnitario * bonificacion.porcentaje);
            Producto.create(item);
            return item;
          })
        }
        res.json(data);
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Producto."
      });

    });
};

// Find a single Producto with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Producto.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Producto with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Producto with id=" + id });
    });
};

// Count all of Producto
exports.count = (req, res) => {
  const search = req.query.search;
  let condition = {};

  if (search) {
    condition['$or'] = [
      {'nombre': { $regex: new RegExp(search), $options: "i" }},
      {'codigo': { $regex: new RegExp(search), $options: "i" }}
    ];
  }

  Producto.count(condition)
    .then(total => {
      res.send({total: total})
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message
      });
    });
}


// Update a Producto by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Producto.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Producto with id=${id}. Maybe Producto was not found!`
        });
      } else res.send({ message: "Producto was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Producto with id=" + id
      });
    });
};

// Delete a Producto with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Producto.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Producto with id=${id}. Maybe Producto was not found!`
        });
      } else {
        res.send({
          message: "Producto was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Producto with id=" + id
      });
    });
};