module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      nombre: String,
      codigo: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Marca = mongoose.model("marca", schema);
  return Marca;
};
