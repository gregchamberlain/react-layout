'use strict';
const path = require('path');

const getDependenciesArray = entry => {
  // const packageJson = require(path.basename(
  //   path.dirname(require.resolve(entry)),
  // ) + '/package.json');
  const packageJson = require(path.resolve(`./packages/${entry}/package.json`));
  const deps = Array.from(
    new Set([
      ...Object.keys(packageJson.dependencies || {}),
      ...Object.keys(packageJson.peerDependencies || {}),
    ]),
  );
  return deps;
};

const dependenciesMap = {
  react: {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react',
  },
  immutable: {
    root: 'Immutable',
    commonjs2: 'immutable',
    commonjs: 'immutable',
    amd: 'immutable',
  },
  'prop-types': {
    root: 'PropTypes',
    commonjs2: 'prop-types',
    commonjs: 'prop-types',
    amd: 'prop-types',
  },
};

const getDependencies = entry => {
  const dependeciesArray = getDependenciesArray(entry);
  const deps = {};
  dependeciesArray.forEach(depName => {
    deps[depName] = dependenciesMap[depName] || depName;
  });
  return deps;
};

module.exports = {
  getDependencies,
};
