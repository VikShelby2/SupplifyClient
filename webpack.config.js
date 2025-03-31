module.exports = {
  // other configurations
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: /node_modules\/(redux|react-dnd|dnd-core)/, // Exclude redux and related modules
      },
    ],
  },
}
