module.exports = {
    devServer: {
      proxy: {
        '^/api': {
          target: 'http://localhost:3333',
          changeOrigin: true,
          logLevel: 'debug',
          pathRewrite: { '^/api': '' },
        },
      },
    },
  }