const express = require('express');
const controllers = require('./controllers');
const { authMiddleware } = require('./authMiddleware');

const router = express.Router();

// Auth routes
router.post('/auth/register', controllers.auth.register);
router.post('/auth/login', controllers.auth.login);

// Location routes
router.post('/locations', authMiddleware, controllers.location.create);
router.get('/locations', authMiddleware, controllers.location.getAll);

// Marker routes
router.post('/markers', authMiddleware, controllers.marker.create);

module.exports = router;
