module.exports = {
  publicPath: './',
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: 'http://localhost:7001',
  },
}
