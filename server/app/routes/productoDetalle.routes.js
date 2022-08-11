module.exports = app => {
    const productoDetalle = require("../controllers/productoDetalle..controller.js");
  
    var router = require("express").Router();
  
    router.post("/", productoDetalle.create);
    router.get("/", productoDetalle.findAll);
    router.get("/:id", productoDetalle.findOne);
    router.put("/:id", productoDetalle.update);
    router.delete("/:id", productoDetalle.delete);
    app.use("/api/productoDetalle", router);
  };