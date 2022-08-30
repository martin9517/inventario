module.exports = app => {
    const productos = require("../controllers/producto.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", productos.create);
    router.post("/import", productos.import);
    router.get("/", productos.findAll);
    router.get("/count", productos.count);
    router.get("/:id", productos.findOne);
    router.put("/:id", productos.update);
    router.delete("/:id", productos.delete);
    app.use("/api/productos", router);
  };