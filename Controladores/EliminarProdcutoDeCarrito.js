const Carrito = require("../rutas/Carrito");
const Producto = require("../rutas/Producto");

const deleteProduct = async (req, res) => {
  const { productoId } = req.params;

  const productosEnCarro = await Carrito.findById(productoId);

  const { nombre, img, precio, _id } = await Producto.findOne({
    nombre: productosEnCarro.nombre,
  });

  await Carrito.findByIdAndDelete(productoId);
  
  /* Buscamos y editamos la prop inCart: false */
  /* Le pasamos la id del producto en la DB */
  /* La prop a cambiar y las demas */
  /* Y el new para devolver el producto editado */
  await Producto.findByIdAndUpdate(
    _id,
    { seleccionado: false, nombre, img, precio },
    { new: true }
  )
    .then((product) => {
      res.json({
        mensaje: `El producto ${product.nombre} fue eliminado del carrito`,
      });
    })
    .catch((error) => res.json({ mensaje: "Hubo un error" }));
};

module.exports = deleteProduct;