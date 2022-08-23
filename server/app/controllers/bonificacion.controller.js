const db = require("../models");
const Bonificacion = db.bonificacion;

// Create and Save a new bonificacion
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nombre) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a bonificacion
    const object = new Bonificacion(req.body);

    // Save Bonificacion in the database
    object
        .save(object)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Bonificacion."
            });
        });
};
// Find a single Bonificacion with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Bonificacion.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Bonificacion with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Bonificacion with id=" + id });
        });
};

// Update a Bonificacion by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Bonificacion.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Bonificacion with id=${id}. Maybe Bonificacion was not found!`
                });
            } else res.send({ message: "Bonificacion was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Marca with id=" + id
            });
        });
};
