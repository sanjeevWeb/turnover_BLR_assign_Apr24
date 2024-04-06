const { getSignedUp, getLoggedIn } = require('../controllers/user.controller');
const router = require('express').Router();

router.post('/signup', getSignedUp);
router.post('/signin', getLoggedIn);

module.exports = router;
