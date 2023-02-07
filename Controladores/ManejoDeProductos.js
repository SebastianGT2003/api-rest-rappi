const Carrito = require("../rutas/Carrito");

const manejoDeProductos = async (req, res) => {
  const { productId } = req.params;
  const { query } = req.query;
  const body = req.body;

  const productBuscado = await Carrito.findById(productId);

  if (!query) {
    res.status(404).json({ mensaje: "Debes enviar una query" });

  } else if (productBuscado && query === "add") {
    body.amount = body.amount + 1;

    await Carrito.findByIdAndUpdate(productId, body, {
      new: true,
    }).then((product) => {
      res.json({
        mensaje: `El producto: ${product.name} fue actualizado`,
        product,
      });
    });

  } else if (productBuscado && query === "del") {
    body.amount = body.amount - 1;

    await Carrito.findByIdAndUpdate(productId, body, {
      new: true,
    }).then((product) =>
      res.json({
        mensaje: `El producto: ${product.name} fue actualizado`,
        product,
      })
    );
  } else {
    res.status(400).json({ mensaje: "Ocurrio un error" });
  }
};

module.exports = manejoDeProductos;