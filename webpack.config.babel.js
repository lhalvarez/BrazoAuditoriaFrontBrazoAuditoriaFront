// Dependencies
import webpack from 'webpack';
import path from 'path';


// Environment
const isDevelopment = process.env.NODE_ENV !== 'production';

// Paths
const PATHS = {
  index: path.join(__dirname, 'src/index'),
  build: path.join(__dirname, 'src/public'),
  src: path.join(__dirname, 'src')
};

const getDevtool = () => 'cheap-module-eval-source-map';
const getEntry = () => {
  const entry = [PATHS.index];

  if (isDevelopment) {
    entry.push('webpack-hot-middleware/client?reload=true');
  }

  return entry;
};
const getOutput = () => ({
  path: PATHS.build,
  publicPath: '/',
  filename: '[name].bundle.js'
});
const getPlugins = () => {
  const plugins = [];
  //const plugins = [
  //  new ChunksPlugin({
   //   to: 'vendor',
   //   test: /node_modules/
   // })
  //];

  if (isDevelopment) {
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    );
  } else {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: false
        }
      })
    );
  }

  return plugins;
};
const getLoaders = () => {
  return ({
    rules: [
      {
        test: /\.js?$/,
        loader: ['babel-loader'],
        include: PATHS.src
      },
      {
        test: /(\.css)$/,
        loader: ['style-loader', 'css-loader']
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.(png)$/,
        loader: 'url-loader?limit=10000&mimetype=image/png'
      },
      {
        test: /\.(jpg)$/,
        loader: 'url-loader?limit=10000&mimetype=image/jpg'
      }
    ]
  });
};

export default {
  devtool: getDevtool(),
  entry: getEntry(),
  output: getOutput(),
  plugins: getPlugins(),
  module: getLoaders()
};
