const validateNewBill = (req, res, next) => {
    const { products } = req.body;

    if (Object.keys(req.body).length > 1) {
        return res.status(400).json({ msg: 'Too many fields were sent' });
    }

    if (!products || products.length === 0) {
        return res.status(400).json({ msg: 'The products field is required' });
    }

    for (const product of products) {
        if (!product.hasOwnProperty('id') || typeof product.id !== 'number') {
            return res.status(400).json({ msg: 'Product ID required' });
        }

        if (!product.hasOwnProperty('name') || typeof product.name !== 'string') {
            return res.status(400).json({ msg: 'Product name required' });
        }

        if (!product.hasOwnProperty('description') || typeof product.description !== 'string') {
            return res.status(400).json({ msg: 'Product description required' });
        }

        if (!product.hasOwnProperty('price') || typeof product.price !== 'number') {
            return res.status(400).json({ msg: 'Product price required' });
        }

        if (!product.hasOwnProperty('pv_product_type') || typeof product.pv_product_type !== 'number') {
            return res.status(400).json({ msg: 'Product pv_product_type required' });
        }

        if (!product.hasOwnProperty('stock') || typeof product.stock !== 'number') {
            return res.status(400).json({ msg: 'Product stock required' });
        }
    }

    next();
}

module.exports = { validateNewBill };