import path from 'path'
import { Configuration } from 'webpack'

export default <Configuration>{
  entry: [
    path.join(process.cwd(), 'app/index.tsx'),
  ],
  devtool: 'source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [ {
          loader: 'awesome-typescript-loader',
          options: {
            silent: true,
            useTranspileModule: true,
            errorsAsWarnings: true,
            transpileOnly: true
          }
        } ],
        exclude: /node_modules/
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              noquotes: true,
            },
          },
        ],
      },
    ]
  },
  resolve: {
    modules: ['node_modules', 'app'],
    extensions: [ '.tsx', '.ts', '.js', '.json' ]
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    publicPath: '/'
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          enforce: true,
          chunks: 'all'
        }
      }
    }
  },
  target: 'web',
  stats: {
    assets: false,
    modules: false
  }
}

