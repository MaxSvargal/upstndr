import path from 'path'
import { Configuration, DefinePlugin } from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'

export default <Configuration>{
  entry: [
    path.join(__dirname, '..', 'app/index'),
  ],
  devtool: 'source-map',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [ {
          loader: 'ts-loader',
          options: {
            silent: true,
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
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: ['node_modules', path.join(process.cwd(), '/app'), './dist/app' ],
    extensions: [ '.tsx', '.ts', '.js', '.json' ]
  },
  plugins: [
    new CleanWebpackPlugin([ 'dist' ], {
      root: process.cwd(),
      verbose: false
    }),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        BROWSER: JSON.stringify('true')
      },
    })
  ],
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    publicPath: '/'
  },
  optimization: {
    minimize: true,
    nodeEnv: 'production',
    sideEffects: true,
    concatenateModules: true,
    splitChunks: { chunks: 'all' },
    runtimeChunk: true,
  },
  target: 'web'
}

