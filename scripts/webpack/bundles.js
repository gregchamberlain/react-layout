'use strict';

const bundleTypes = {
  UMD_DEV: 'UMD_DEV',
  UMD_PROD: 'UMD_PROD',
  NODE_DEV: 'NODE_DEV',
  NODE_PROD: 'NODE_PROD',
};

const UMD_DEV = bundleTypes.UMD_DEV;
const UMD_PROD = bundleTypes.UMD_PROD;
const NODE_DEV = bundleTypes.NODE_DEV;
const NODE_PROD = bundleTypes.NODE_PROD;

const bundles = [
  {
    label: 'react-layout-core',
    bundleTypes: [UMD_DEV, UMD_PROD, NODE_DEV, NODE_PROD],
    entry: 'core',
    global: 'ReactLayout',
    externals: {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
    },
  },
];

module.exports = {
  bundleTypes,
  bundles,
};
