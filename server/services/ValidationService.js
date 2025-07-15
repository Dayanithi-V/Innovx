const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

exports.validateDockerBuild = async (repoName) => {
  const repoPath = path.join(__dirname, `../../repos/${repoName}`);
  const imageTag = `autodock-${repoName.toLowerCase()}`;

  return new Promise((resolve, reject) => {
    const buildCmd = `docker build -t ${imageTag} .`;

    exec(buildCmd, { cwd: repoPath }, (error, stdout, stderr) => {
      if (error) {
        return reject({
          success: false,
          message: 'Docker build failed',
          logs: stderr || error.message,
        });
      }

      // ✅ Save logs here
      fs.writeFileSync(path.join(repoPath, 'build.log'), stdout);

      resolve({
        success: true,
        message: 'Docker build successful',
        logs: stdout,
        image: imageTag,
      });
    });
  });
};


// Optional: Run and health-check container
exports.runHealthCheck = async (imageTag, port) => {
  return new Promise((resolve) => {
    const runCmd = `docker run -d -p ${port}:${port} ${imageTag}`;

    exec(runCmd, (error, stdout, stderr) => {
      if (error) {
        return resolve({
          success: false,
          message: 'Container failed to run',
          logs: stderr,
        });
      }

      const containerId = stdout.trim();
      resolve({
        success: true,
        containerId,
        message: 'Container running successfully',
      });

      // Optional: Stop and remove after few secs
      setTimeout(() => {
        exec(`docker rm -f ${containerId}`, () => {});
      }, 10000);
    });
  });
};
