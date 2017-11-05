const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const bundles = require('./bundles').bundles;
const bundleTypes = require('./bundles').bundleTypes;
const getDependencies = require('./modules').getDependencies;

const getBundleInfo = (bundle, bundleType) => {
  const [target, env] = bundleType.split('_');
  const info = {};
  switch (target) {
    case 'NODE':
      Object.assign(info, {
        folder: 'cjs',
        libraryTarget: 'commonjs2',
        externals: getDependencies(bundle.entry),
      });
      break;
    case 'UMD':
      Object.assign(info, {
        folder: 'umd',
        libraryTarget: 'umd',
        externals: bundle.externals,
      });
      break;
  }
  switch (env) {
    case 'DEV':
      info.filename = `${bundle.label}.js`;
      break;
    case 'PROD':
      info.filename = `${bundle.label}.min.js`;
      break;
  }
  return info;
};

const createConfig = (bundle, bundleType) => {
  const bundleInfo = getBundleInfo(bundle, bundleType);
  return {
    entry: path.resolve(`./packages/${bundle.entry}/index.js`),
    output: {
      path: path.resolve(`./build/packages/${bundle.entry}`, bundleInfo.folder),
      filename: bundleInfo.filename,
      library: bundle.global,
      libraryTarget: bundleInfo.libraryTarget,
    },
    externals: bundleInfo.externals,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    stats: 'none',
  };
};

const build = config => {
  const compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) {
        return reject(err);
      }
      resolve();
    });
  });
};

const createCopyConfig = bundle => ({
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(`./packages/${bundle.entry}/npm/index.js`),
        to: path.resolve(`./build/packages/${bundle.entry}/index.js`),
      },
      {
        from: path.resolve(`./packages/${bundle.entry}/package.json`),
        to: path.resolve(`./build/packages/${bundle.entry}/package.json`),
      },
      {
        from: path.resolve('./LICENSE'),
        to: path.resolve(`./build/packages/${bundle.entry}`),
      },
    ]),
  ],
});

const buildMultiple = configs => {
  const config = configs[0];
  if (!config) return;
  console.log('BUILDING', config.name);
  build(config.config)
    .then(() => {
      console.log('COMPLETED', config.name);
      buildMultiple(configs.slice(1));
    })
    .catch(err => console.log(err));
};

const bundleConfigs = [];

bundles.forEach(bundle => {
  bundle.bundleTypes.forEach((bundleType, i) => {
    const config = createConfig(bundle, bundleType);
    if (i === 0) {
      Object.assign(config, createCopyConfig(bundle));
    }
    bundleConfigs.push({
      config: config,
      name: bundle.label + ' ' + bundleType,
    });
  });
});

buildMultiple(bundleConfigs);
