const express = require('express');
const { getRants, addRant } = require('../controllers/rantController');
const router = express.Router();

router.get('/', getRants);
router.post('/', addRant);

module.exports = router;
