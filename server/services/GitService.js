const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

exports.cloneRepository = async (repoUrl) => {
  const repoName = path.basename(repoUrl).replace('.git', '');
  const clonePath = path.join(__dirname, '../../repos', repoName);
  if (fs.existsSync(clonePath)) {
    fs.rmdirSync(clonePath, { recursive: true });
  }
  execSync(`git clone ${repoUrl} ${clonePath}`);
  return repoName;
};
