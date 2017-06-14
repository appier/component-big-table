import path from 'path';
import webpack from 'webpack';
import { name } from './package.json';

export default {

  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    filename: `${name}.js`,
    path: path.resolve('build'),
    libraryTarget: 'umd',
  },

  externals: {
    classnames: 'classnames',
    immutable: 'immutable',
    react: 'react',
    'react-addons-pure-render-mixin': 'react-addons-pure-render-mixin',
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          require('autoprefixer'),
          require('postcss-nested'),
        ],
      }
    }),
  ],

  resolve: {
    modules: [
      'src',
      'node_modules'
    ],
    extensions: ['.js', '.jsx'],
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader',
      },
      {
        test: /\.jsx?$/,
        loaders: 'babel-loader',
      },
    ],
  },

};
