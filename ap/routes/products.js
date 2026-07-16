const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

let products = [];

// GET /products - Obtener todos los productos
router.get('/', (req, res, next) => {
    try {
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
});

// GET /products/:id - Obtener un producto por ID
router.get('/:id', (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: 'El ID debe ser un número válido'
            });
        }

        const product = products.find(p => p.id === id);

        if (!product) {
            return res.status(404).json({
                message: 'Producto no encontrado'
            });
        }

        res.status(200).json(product);

    } catch (error) {
        next(error);
    }
});

// POST /products - Crear producto
router.post('/', (req, res, next) => {
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

        const newProduct = new Product(
            products.length + 1,
            name,
            descr,
            price,
            new Date()
        );

        products.push(newProduct);

        res.status(201).json({
            message: 'Producto creado correctamente',
            product: newProduct
        });

    } catch (error) {
        next(error);
    }
});

// PUT /products/:id - Actualizar producto
router.put('/:id', (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: 'El ID debe ser un número válido'
            });
        }

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

        res.status(200).json({
            message: 'Producto actualizado correctamente',
            product
        });

    } catch (error) {
        next(error);
    }
});

// DELETE /products/:id - Eliminar producto
router.delete('/:id', (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: 'El ID debe ser un número válido'
            });
        }

        const index = products.findIndex(p => p.id === id);

        if (index === -1) {
            return res.status(404).json({
                message: 'Producto no encontrado'
            });
        }

        products.splice(index, 1);

        res.status(200).json({
            message: 'Producto eliminado correctamente'
        });

    } catch (error) {
        next(error);
    }
});

module.exports = router;