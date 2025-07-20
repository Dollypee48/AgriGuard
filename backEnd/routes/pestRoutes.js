
const express = require('express');
const router = express.Router();

const { fetchPests, fetchPestDetailsBySearch } = require('../controllers/pestController');

router.get('/common', fetchPests);
router.get('/details', fetchPestDetailsBySearch);

module.exports = router;
