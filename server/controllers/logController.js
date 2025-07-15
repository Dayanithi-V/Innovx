const fs = require('fs');
const path = require('path');

exports.getBuildLogs = (req, res) => {
  const { repoName } = req.params;
  const logPath = path.join(__dirname, `../../repos/${repoName}/build.log`);

  if (fs.existsSync(logPath)) {
    const logs = fs.readFileSync(logPath, 'utf-8');
    res.send(logs);
  } else {
    res.status(404).send('Logs not found');
  }
};
