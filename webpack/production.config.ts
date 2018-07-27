import path from 'path'
import { Configuration } from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'

export default <Configuration>{
  entry: [
    path.join(process.cwd(), 'app/index.tsx'),
  ],
  mode: 'production',
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
  plugins: [
    new CleanWebpackPlugin([ 'dist' ], {
      root: path.join(__dirname, '..'),
      verbose: false
    }),
  ],
  output: {
    path: path.join(__dirname, '../dist'),
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

