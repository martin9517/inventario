module.exports = app => {
    const bonificacion = require("../controllers/bonificacion.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", bonificacion.create);
    router.get("/:id", bonificacion.findOne);
    router.put("/:id", bonificacion.update);
    app.use("/api/bonificaciones", router);
  };
  