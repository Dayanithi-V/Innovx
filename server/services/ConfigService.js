const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml'); // Install: npm install js-yaml

exports.generateConfig = async (stackInfo, repoName) => {
  const configPath = path.join(__dirname, `../../repos/${repoName}/autodock.config.yaml`);

  const config = {
    app: repoName,
    port: stackInfo.includes('Python') ? 5000 : 3000,
    env: {
      NODE_ENV: 'production',
    },
    startCommand: stackInfo.includes('Python') ? 'python app.py' : 'npm start',
  };

  const yamlContent = yaml.dump(config);
  fs.writeFileSync(configPath, yamlContent);
  return yamlContent;
};
