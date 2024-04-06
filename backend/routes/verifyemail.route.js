const express = require('express');
const { verifyOTPHandler, verifyEmailHandler } = require('../controllers/verifyemail.controller');
const router = express.Router();

router.get('/verifyemail', verifyEmailHandler);
router.post('/verifyotp', verifyOTPHandler);

module.exports = router;
