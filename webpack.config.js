const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: './src/components/AppointmentBook.tsx',
  output: {
    filename: 'my-widget.js', // Ensure widget.js is in public folder
    path: path.resolve(__dirname, 'public'),
    library: 'MyWidgetLibrary',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
    extensions: ['.tsx', '.ts', '.js', '.css'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'my-widget.css', // Path to save CSS file
    }),
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};
