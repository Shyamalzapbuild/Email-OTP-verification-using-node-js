const express = require('express');
const router = express.Router();
const {getotp,postotp,getverify,postverify}=require('../controller/mail');

router.get('/send',getotp);
router.post('/send',postotp);
router.get('/verify',getverify);
router.post('/verify',postverify);


module.exports = router;