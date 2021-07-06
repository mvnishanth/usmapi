'use strict';
let express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();
const app = express();
app.use(bodyParser.json({ type: 'application/*+json' }))
//====================================================================
// Setup route middleware to handle common actions
// 
router.use((req, res, next) => {
    next();
}); 
/// signup
let authenticateRoutes = require('./modules/authenticate/authenticateRoutes.js');
router.use('/auth', authenticateRoutes);
//// signup
router.get('/healthcheck', (req, res) => res.send("S_API working fine"));

module.exports = router;