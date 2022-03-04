const express = require('express');
const productsManager= require('./Manager/productsManager')
const ProductsRouter= require('./routes/ProductsRouter')
const CartRouter= require('./routes/CartRouter')
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('*',(req, res) => {
    res.send({error:-2,descripcion:`ruta ${req.url} metodo ${req.method} no implementad`})
})
app.use('/api/productos',ProductsRouter);
app.use('/api/carrito',CartRouter);


const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>console.log(`listening on ${PORT}`));