module.exports = app => {
    const sexo = require("../controllers/sexo.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", sexo.create);
    app.use("/api/sexo", router);
  };
  