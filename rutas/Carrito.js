const { model , Schema } = require("mongoose");

const EsquemaCarrito = new Schema({
    nombre: { type: String, require: true, unique: true},
    img: {type: String, require: true},
    cantidad: {type: Number, require: true},
    precio: {type: Number, require: true}
})

module.exports = model("Carrito", EsquemaCarrito);