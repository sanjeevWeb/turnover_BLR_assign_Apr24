const { getProducts, getProductsFromJSON, saveCheckedProducts, getPreviousCheckedProducts } = require('../controllers/product.controller.js');
const authenticateUser = require('../utility/authenticate');
const router = require('express').Router();

router.get('/products', getProductsFromJSON);
router.get('/getchkproduct', authenticateUser, getPreviousCheckedProducts);
router.post('/chkproduct', authenticateUser, saveCheckedProducts);

module.exports = router;
