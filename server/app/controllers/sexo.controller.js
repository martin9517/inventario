/*const db = require("../models");
const Sexo = db.sexo;

// Create and Save a new Sexo
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nombre) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Sexo
  const object = new Sexo(req.body);

  // Save Sexo in the database
  object
    .save(object)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Sexo."
      });
    });
};
*/
