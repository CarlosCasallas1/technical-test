const express = require('express');
const app = express();
const productsRoutes = require('./routes/products.js');
const errorHandler = require('./middleware/errorHandler');

const port = 3000;

app.use(express.json());

// Rutas para productos
app.use('/products', productsRoutes);
// Middleware global para errores
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});