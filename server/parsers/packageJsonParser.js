const fs = require('fs');
const path = require('path');

exports.parsePackageJson = (repoPath) => {
  const file = path.join(repoPath, 'package.json');
  if (!fs.existsSync(file)) return null;

  const pkg = JSON.parse(fs.readFileSync(file, 'utf-8'));
  return {
    dependencies: pkg.dependencies,
    scripts: pkg.scripts,
    main: pkg.main || 'index.js',
  };
};

