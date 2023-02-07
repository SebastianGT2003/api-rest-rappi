const Carrito = require("../rutas/Carrito");

const ProductosEnCarrito = async (req, res) => {
  const productosEnCarro = await Carrito.find();

  if (productosEnCarro) {
    res.json({ productosEnCarro });
  } else {
    res.json({ mensaje: "No hay productos en el carrito" });
  }
};

module.exports = ProductosEnCarrito;