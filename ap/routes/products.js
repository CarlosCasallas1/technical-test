const express = require('express');
const router = express.Router();


let products = [];

// GET /products - Obtener todos los productos
router.get('/', (req, res) => {
    try {
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// GET /products/:id - Obtener un producto por ID
router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const product = products.find(p => p.id === id);

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
// POST /products - Crear producto
router.post('/', (req, res) => {
    try {
        const { name, descr, price } = req.body;

        if (!name || !descr || price === undefined) {
            return res.status(400).json({
                message: 'Todos los campos son obligatorios'
            });
        }

        if (price <= 0) {
            return res.status(400).json({
                message: 'El precio debe ser mayor que cero'
            });
        }

        const newProduct = {
            id: products.length + 1,
            name,
            descr,
            price,
            creationDate: new Date()
        };

        products.push(newProduct);

        res.status(201).json(newProduct);

    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// PUT /products/:id - Actualizar producto
router.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, descr, price } = req.body;

        const product = products.find(p => p.id === id);

        if (!product) {
            return res.status(404).json({
                message: 'Producto no encontrado'
            });
        }

        if (!name || !descr || price === undefined) {
            return res.status(400).json({
                message: 'Todos los campos son obligatorios'
            });
        }

        if (price <= 0) {
            return res.status(400).json({
                message: 'El precio debe ser mayor que cero'
            });
        }

        product.name = name;
        product.descr = descr;
        product.price = price;

        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});


// DELETE /products/:id - Eliminar producto
router.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const index = products.findIndex(p => p.id === id);

        if (index === -1) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        products.splice(index, 1);

        res.status(200).json({ message: 'Producto eliminado' });

    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;	