const express= require('express')
const app = express()
const controllers = require("./Controladores")

//Importar conexion MongoDB
const archiboBD= require('./conexion')

//Importacion del archivo de rutas y modelo usuario

const rutausuario= require('./rutas/usuario')


//Importar body parser
const bodyParser= require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:'true'}))
app.use('/api/usuario', rutausuario)


app.get("/productos", controllers.Productos);
app.get("/productos-en-carrito", controllers.ProductosEnCarrito);
app.post("/productos-en-carrito", controllers.AgregarProducto);
app.put("/productos-en-carrito:productoId", controllers.ManejoDeProductos);
app.delete("/productos-en-carrito:productoId", controllers.EliminarProdcutoDeCarrito);

//Configurar server basico

app.listen(5000, function(){
    console.log('El servidor esta corriendo correctamente')

})