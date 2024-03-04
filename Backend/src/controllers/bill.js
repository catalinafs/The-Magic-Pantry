const { Op } = require("sequelize");
const { updateStock } = require("../helpers/updateStock");
const { sequelize, Bill, Product, User, Bill_Details } = require("../models");
const { userExists } = require("../helpers/userExist");

const createBill = async (req, res) => {
    const { id } = req.decode;
    const { products } = req.body;

    const transaction = await sequelize.transaction();

    try {
        // Check user existence
        const userExist = await userExists(id);
        if (!userExist) {
            await transaction.rollback();

            return res.status(404).json({ msg: 'User not found' });
        }

        // Check products existence and length
        if (!products || products.length === 0) {
            await transaction.rollback();

            return res.status(400).json({ msg: 'To perform billing, at least 1 product is required' });
        }

        // Check product validity & build product map for efficiency
        const productsMap = {};
        let productsCount = 0;

        for (const product of products) {
            const productExisting = await Product.findOne({
                where: { id: product.id, state: 1, stock: { [Op.gt]: 0, } }
            });

            if (productExisting) {
                await updateStock(productExisting.id);
                productsMap[productsCount] = productExisting;
                productsCount++;
            }
        }

        if (productsCount !== products.length) {
            await transaction.rollback();

            return res.status(400).json({ msg: "There are invalid products" });
        }

        // Calculate total price & create bill
        let total_price = 0;
        for (const product_id in productsMap) {
            total_price = productsMap[product_id].price + total_price;
        }

        const newBill = await Bill.create({
            id_client: id,
            total_products: products.length,
            total_price,
        });

        // Create bill details based on products
        const billDetails = products.map((product) => ({
            id_bill: newBill.id,
            id_product: product.id,
        }));

        await Bill_Details.bulkCreate(billDetails);

        await transaction.commit();

        res.status(200).json({ bill: newBill });
    } catch (error) {
        console.log(error);

        await transaction.rollback();

        res.status(500).json({ msg: 'Server error' });
    }
}

const getAllBillsByclient = async (req, res) => {
    const { id } = req.decode;

    const transaction = await sequelize.transaction();

    try {
        // Check user existence
        const userExist = await userExists(id);
        if (!userExist) {
            await transaction.rollback();

            return res.status(404).json({ msg: 'User not found' });
        }

        res.status(200).json({ msg: 'Endpoint en proceso' });
    } catch (error) {
        console.log(error);

        await transaction.rollback();

        res.status(500).json({ msg: 'Server error' });
    }
}

const getBillByclient = async (req, res) => {
    const { id } = req.decode;

    const transaction = await sequelize.transaction();

    try {
        // Check user existence
        const userExist = await userExists(id);
        if (!userExist) {
            await transaction.rollback();

            return res.status(404).json({ msg: 'User not found' });
        }

        res.status(200).json({ msg: 'Endpoint en proceso' });
    } catch (error) {
        console.log(error);

        await transaction.rollback();

        res.status(500).json({ msg: 'Server error' });
    }
}

const getAllBills = async (req, res) => {
    const { id } = req.decode;

    const transaction = await sequelize.transaction();

    try {
        // Check user existence
        const userExist = await userExists(id);
        if (!userExist) {
            await transaction.rollback();

            return res.status(404).json({ msg: 'User not found' });
        }

        res.status(200).json({ msg: 'Endpoint en proceso' });
    } catch (error) {
        console.log(error);

        await transaction.rollback();

        res.status(500).json({ msg: 'Server error' });
    }
}

const getBillById = async (req, res) => {
    const { id } = req.decode;

    const transaction = await sequelize.transaction();

    try {
        // Check user existence
        const userExist = await userExists(id);
        if (!userExist) {
            await transaction.rollback();

            return res.status(404).json({ msg: 'User not found' });
        }

        res.status(200).json({ msg: 'Endpoint en proceso' });
    } catch (error) {
        console.log(error);

        await transaction.rollback();

        res.status(500).json({ msg: 'Server error' });
    }
}

module.exports = {
    createBill,
    getAllBillsByclient,
    getBillByclient,
    getAllBills,
    getBillById,
};