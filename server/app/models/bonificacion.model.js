module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            porcentaje: Number
        },
        { timestamps: true }
    );
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Bonificacion = mongoose.model("Bonificacion", schema);
    return Bonificacion;
};    