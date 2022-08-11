const { Schema } = require("mongoose");

module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        cantidad: Number,
        producto : [{ type: Schema.Types.ObjectId, ref: 'Producto' }]
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const ProductoDetalle = mongoose.model("productoDetalle", schema);
    return ProductoDetalle;
  };
  