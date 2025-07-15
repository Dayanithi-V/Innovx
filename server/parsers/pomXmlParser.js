const fs = require('fs');
const xml2js = require('xml2js');

exports.parsePomXml = async (repoPath) => {
  const file = `${repoPath}/pom.xml`;
  if (!fs.existsSync(file)) return null;

  const xml = fs.readFileSync(file, 'utf-8');
  const result = await xml2js.parseStringPromise(xml);
  const deps = result.project.dependencies[0].dependency.map((d) => ({
    groupId: d.groupId[0],
    artifactId: d.artifactId[0],
    version: d.version[0],
  }));

  return deps;
};
