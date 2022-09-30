import * as path from 'path'
import * as webpack from 'webpack'

import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin'
import 'webpack-dev-server'

const config: webpack.Configuration = {
  mode: 'development',
  entry: './src/main/index.tsx',
  output: {
    path: path.resolve(__dirname, 'public/js'),
    publicPath: '/public/js',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss'],
    alias: {
      '@/client': path.join(__dirname, 'src')
    }
  },
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        options: {
          modules: true
        }
      }, {
        loader: 'sass-loader'
      }]
    }]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    devMiddleware: {
      writeToDisk: true
    },
    historyApiFallback: true
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify('http://localhost:3000')
    }),
    new CleanWebpackPlugin({
      dangerouslyAllowCleanPatternsOutsideProject: true
    }),
    new NodePolyfillPlugin()
  ]
}

export default config
