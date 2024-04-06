const CheckedProduct = require("../models/chkProduct.model");
const myProducts = require('../models/products.json');
const UserChkProduct = require("../models/userChkProduct.model");

const getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 6;
        const offset = (page - 1) * limit;

        const products = await Product.findAll({ offset, limit });

        res.json({
            products,
            currentPage: page,
        });
    } catch (error) {
        console.log(error);
    }
}

const getProductsFromJSON = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    const products = myProducts;

    // edge cases
    if (endIndex < products.length) {
        results.next = {
            page: page + 1,
            limit: limit
        };
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        };
    }

    results.results = products.slice(startIndex, endIndex);
    res.json(results);
}

const saveCheckedProducts = async (req, res) => {
    try {
        const user = req.user;
        const { checkedProductIds } = req.body;

        for (let productId of checkedProductIds) {
            await CheckedProduct.findOrCreate({ where: { productId } });

            await UserChkProduct.create({
                UserId: user.user_id,
                CheckedProductId: productId
            });
        }

        return res.json({ msg: 'Checked products saved successfully' });
    } catch (error) {
        console.log(error);
    }
}

const getPreviousCheckedProducts = async (req, res) => {
    try {
        const user = req.user;
        const checkedProducts = await UserChkProduct.findAll({ where: { UserId: user.user_id } });

        if (checkedProducts.length === 0) {
            return res.json({ msg: "no products saved" });
        }

        return res.json({ checkedProducts });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getProducts,
    getProductsFromJSON,
    saveCheckedProducts,
    getPreviousCheckedProducts
};
