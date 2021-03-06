const path = require('path');
const findProject = require('./findProject');

/**
 * For libraries specified without an extension, add '.tbd' for those that
 * start with 'lib' and '.framework' to the rest.
 */
const mapSharedLibaries = (libraries) => {
  return libraries.map(name => {
    if (path.extname(name)) {
      return name;
    }
    return name + (name.indexOf('lib') === 0 ? '.tbd' : '.framework');
  });
};

/**
 * Returns project config by analyzing given folder and applying some user defaults
 * when constructing final object
 */
exports.projectConfig = function projectConfigIOS(folder, userConfig) {
  const project = userConfig.project || findProject(folder);
  console.log(folder, userConfig);
  /**
   * No iOS config found here
   */
  if (!project) {
    return null;
  }

  const projectPath = path.join(folder, project);

  return {
    sourceDir: path.dirname(projectPath),
    folder: folder,
    pbxprojPath: path.join(projectPath, 'project.pbxproj'),
    projectPath: projectPath,
    projectName: path.basename(projectPath),
    libraryFolder: userConfig.libraryFolder || 'Libraries',
    sharedLibraries: mapSharedLibaries(userConfig.sharedLibraries || []),
    plist: userConfig.plist || [],
  };
};

exports.dependencyConfig = exports.projectConfig;
