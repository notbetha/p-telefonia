const express = require('express');
const { getCalls } = require('./calls.controller');
const router = express.Router();

router.get('/:idClient', getCalls);

module.exports = router;
