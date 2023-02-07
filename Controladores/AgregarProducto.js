const Carrito = require("../rutas/Carrito");
const Producto = require("../rutas/Producto");

const agregarProducto = async (req, res) => {
  const { nombre, img, precio } = req.body;

  /* Nos fijamos si tenemos el producto */
  const estaEnProducts = await Producto.findOne({ nombre });

  const noEstaVacio = nombre !== "" && img !== "" && precio !== "";

  const estaEnElCarrito = await Carrito.findOne({ nombre });

  /* Si no tenemos el producto */
  if (!estaEnProducts) {
    res.status(400).json({
      mensaje: "Este producto no se encuentra en nuestra base de datos",
    });
  } else if (noEstaVacio && !estaEnElCarrito) {
    const newProductInCart = new Carrito({ nombre, img, precio, amount: 1 });
    await Producto.findByIdAndUpdate(
      estaEnProducts?._id,
      { inCart: true, nombre, img, precio },
      { new: true }
    )
      .then((product) => {
        newProductInCart.save();
        res.json({
          mensaje: `El producto fue agregado al carrito`,
          product,
        });
      })
      .catch((error) => console.error(error));

  } else if (estaEnElCarrito) {
    res.status(400).json({
      mensaje: "El producto ya esta en el carrito",
    });
  }
};

module.exports = agregarProducto;