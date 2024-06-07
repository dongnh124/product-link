/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
  dotenv: resolveApp('.env'),
  // appDist: resolveApp('dist'),
  // appMainJs: resolveApp('src/main.ts'),
  // appPackageJson: resolveApp('package.json'),
  // appSrc: resolveApp('src'),
  // yarnLockFile: resolveApp('yarn.lock'),
  // appNodeModules: resolveApp('node_modules')
};
