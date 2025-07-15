const express = require('express');
const { getBuildLogs } = require('../controllers/logController');

const router = express.Router();
router.get('/:repoName', getBuildLogs);

module.exports = router;
