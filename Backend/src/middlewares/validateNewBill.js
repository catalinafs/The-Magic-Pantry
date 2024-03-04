const validateNewBill = (req, res, next) => {
    const { products } = req.body;

    if (Object.keys(req.body).length > 1) {
        return res.status(400).json({ msg: 'Too many fields were sent' });
    }

    if (!products || products.length === 0) {
        return res.status(400).json({ msg: 'To perform billing, at least 1 product is required' });
    }

    const productsIDs = products.filter((elemento) => !isNaN(elemento));
    const productsIDsNum = productsIDs.every((numero) => Number.isInteger(numero));

    if (!productsIDsNum) {
        res.status(400).json({ msg: 'Product IDs must be sent' });
    }

    next();
}

module.exports = { validateNewBill };