const GitService = require('../services/GitService');
const GPTService = require('../services/GPTService');
const DockerService = require('../services/DockerService');
const ConfigService = require('../services/ConfigService');

exports.analyzeRepository = async (req, res) => {
  const { repoUrl } = req.body;
  try {
    const repoName = await GitService.cloneRepository(repoUrl);
    const stackInfo = await GPTService.analyzeRepo(repoName);
    const dockerfile = await DockerService.generateDockerfile(stackInfo, repoName);
    const config = await ConfigService.generateConfig(stackInfo, repoName);

    res.json({ repoName, stackInfo, dockerfile, config });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to analyze repository' });
  }
};
