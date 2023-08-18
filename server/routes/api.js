const express = require('express');
const controller = require('../controllers/controllers');
const router = express.Router();

// User routes
router.post('/saveUser', controller.saveUser);

// Watchlist routes
router.post('/addToWatchlist/:userId', controller.addToWatchlist);

module.exports = router;
