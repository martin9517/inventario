module.exports = app => {
    const cantidadProducto = require("../controllers/cantidadProducto.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", cantidadProducto.create);
    router.get("/", cantidadProducto.findAll);
    router.get("/:id", cantidadProducto.findOne);
    router.put("/:id", cantidadProducto.update);
    router.delete("/:id", cantidadProducto.delete);
    app.use("/api/CantidadProducto", router);
  };