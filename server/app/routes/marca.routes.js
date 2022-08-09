module.exports = app => {
  const marcas = require("../controllers/marca.controller.js");

  var router = require("express").Router();

  router.post("/", marcas.create);
  router.get("/", marcas.findAll);
  router.get("/:id", marcas.findOne);
  router.put("/:id", marcas.update);
  router.delete("/:id", marcas.delete);
  app.use("/api/marcas", router);
};
