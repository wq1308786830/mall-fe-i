/**
 * Cautions
 * customize-cra@1.0.0 strictly corresponds to less-loader@5.0.0
 */
const path = require('path');
const webpack = require('webpack'); // do not install webpack yourself
const px2rem = require('postcss-px2rem');
const {
  override,
  addWebpackAlias,
  fixBabelImports,
  addLessLoader,
  addBundleVisualizer,
  addPostcssPlugins,
  addWebpackPlugin,
} = require('customize-cra');

module.exports = override(
  addLessLoader({
    strictMath: true,
    noIeCompat: true,
    relativeUrls: false, // Optionally adjust URLs to be relative. When false, URLs are already relative to the entry less file.
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#1DA57A', // for example, you use Ant Design to change theme color.
    },
    cssLoaderOptions: {
      // config to remove word 'module' in less file name
      modules: { localIdentName: '[local]_[hash:base64:5]' },
    }, // .less file used css-loader option, not all CSS file.
  }),
  addPostcssPlugins([px2rem({ remUnit: 100 })]), // addPostcssPlugins must appear after addLessLoader
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: true,
  }),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
    '@components': path.resolve(__dirname, 'src/components'),
  }),
  addWebpackPlugin(
    new webpack.DefinePlugin({
      'process.env.MOCK': JSON.stringify(process.env.MOCK) || '',
      'process.env.ENV_DEBUG': JSON.stringify(process.env.ENV_DEBUG) || '',
      'process.env.ENV_NAME': JSON.stringify(process.env.ENV_NAME) || '',
    }),
  ),
  addBundleVisualizer({}, true),
);
