const Producto = require("../rutas/Producto");

const productos = async (req, res) => {
  const products = await Producto.find();

  if (products) {
    res.json({ products });
  } else {
    res.json({ mensaje: "No hay productos" });
  }
};

module.exports = productos;