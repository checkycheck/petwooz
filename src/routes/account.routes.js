const express = require('express');
const router = express.Router();
const accountCtrl = require('../controllers/account.controller');
const verify = require('../middleware/verify');

router
    .post('/register', [verify.checkDuplicateEmail, verify.checkDuplicatePhone, verify.checkDuplicateUsername], accountCtrl.register)
    .post('/login', accountCtrl.login)

module.exports = router;