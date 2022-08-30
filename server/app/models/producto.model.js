const { Schema } = require("mongoose");

module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        nombre: String,
        codigo: String,
        precioUnitario: Number,
        precioBonificado: Number,
        talle: String,
        marca : { type: Schema.Types.ObjectId, ref: 'Marca' }
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Producto = mongoose.model("producto", schema);
    return Producto;
  };
  