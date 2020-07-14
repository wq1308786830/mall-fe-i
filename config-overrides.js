/**
 * 注意
 * customize-cra @1.0.0 严格对应 less-loader @5.0.0
 */
const path = require('path');
const webpack = require('webpack'); // webpack不要自己安装，取cra自带的，不然会有冲突
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
    modifyVars: {
      '@primary-color': '#1DA57A', // for example, you use Ant Design to change theme color.
    },
    cssLoaderOptions: {}, // .less file used css-loader option, not all CSS file.
    cssModules: {
      localIdentName: '[local]--[hash:base64:5]', // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
    },
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
