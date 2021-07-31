const path = require('path');
// const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './'),
  },
  // resolve: {
  //   extensions: ['.js'],
  // },
  // target: 'node',
  mode: 'production',
  // plugins: [new NodemonPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

// module.exports = {
//   entry: './app.js',
//   output: {
//     path: path.resolve('./'),
//     filename: 'appServer.js',
//   },
//   mode: 'production',
//   plugins: [
//     new NodemonPlugin(), // Dong
//   ],
// };
