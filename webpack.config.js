module.exports = (env, argv) => ({
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    host: '127.0.0.1',
    port: 7000
  },
  entry: {
    app: ['babel-polyfill', 'whatwg-fetch', './src/index.js', './src/less/global.less'],
    vendor: ['babel-polyfill', 'react', 'react-dom', 'firebase']
  },
  resolve: {
    alias: {
      contexts: __dirname + "/src/contexts",
      js: __dirname + "/src/js",
      images: __dirname + "/src/images",
      styles: __dirname + "/src/styles"
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }, {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            modules: true,
            localIdentName: "[local]___[hash:base64:5]"
          }
        }, {
          loader: 'less-loader'
        }]
      }, {
        test: /\.(woff2?|eot|svg|ttf|md|jpg|png)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash].[ext]',
              publicPath: argv.mode === 'development'
                ? '/compiled/'
                : 'https://apkallufalls.com/compiled/'
            }
          }
        ]
      }
    ]
  },
  output: {
      filename: '[name].min.js',
      path: __dirname + '/dist/compiled',
      chunkFilename: '[name].min.js',
      publicPath: '/',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true
        },
      }
    },
    runtimeChunk: true
  }
});