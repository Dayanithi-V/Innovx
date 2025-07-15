const fs = require('fs');
const path = require('path');

exports.generateDockerfile = async (stackInfo, repoName) => {
  const dockerfilePath = path.join(__dirname, `../../repos/${repoName}/Dockerfile`);

  // Simple parser (this can be replaced by GPT output parsing)
  let dockerContent = '';

  if (stackInfo.includes('Node.js')) {
    dockerContent = `
# Auto-generated Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
    `;
  } else if (stackInfo.includes('Python')) {
    dockerContent = `
FROM python:3.10-slim
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
EXPOSE 5000
CMD ["python", "app.py"]
    `;
  } else {
    dockerContent = `
# Generic fallback Dockerfile
FROM ubuntu:22.04
WORKDIR /app
COPY . .
CMD ["bash"]
    `;
  }

  fs.writeFileSync(dockerfilePath, dockerContent.trim());
  return dockerContent.trim();
};
