const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/:fileType/:repoName', (req, res) => {
  const { fileType, repoName } = req.params;
  let filePath;

  switch (fileType) {
    case 'dockerfile':
      filePath = path.join(__dirname, `../../repos/${repoName}/Dockerfile`);
      break;
    case 'config':
      filePath = path.join(__dirname, `../../repos/${repoName}/autodock.config.yaml`);
      break;
    default:
      return res.status(400).json({ error: 'Invalid file type' });
  }

  res.download(filePath, (err) => {
    if (err) res.status(500).json({ error: 'File not found or error in download.' });
  });
});

module.exports = router;
