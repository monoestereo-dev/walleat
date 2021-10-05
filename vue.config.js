const path = require('path')

module.exports = {
  publicPath: '/',
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          includePaths: ['./node_modules', './src/assets'],
        },
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@themeConfig': path.resolve(__dirname, 'themeConfig.js'),
        '@core': path.resolve(__dirname, 'src/@core'),
        '@validations': path.resolve(__dirname, 'src/@core/utils/validations/validations.js'),
        '@axios': path.resolve(__dirname, 'src/libs/axios'),
      },
    },
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        // eslint-disable-next-line no-param-reassign
        options.transformAssetUrls = {
          img: 'src',
          image: 'xlink:href',
          'b-avatar': 'src',
          'b-img': 'src',
          'b-img-lazy': ['src', 'blank-src'],
          'b-card': 'img-src',
          'b-card-img': 'src',
          'b-card-img-lazy': ['src', 'blank-src'],
          'b-carousel-slide': 'img-src',
          'b-embed': 'src',
        }
        return options
      })
  },
  transpileDependencies: ['vue-echarts', 'resize-detector'],
  pwa: {
    name: 'Walleat',
    themeColor: '#7367f0',
    msTileColor: '#7367f0',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      description: 'Tu nueva forma de pago',
      background_color: '#7367f0',
      start_url: '/',
      shortcuts: [
        {
          name: 'Mis Walleats',
          short_name: 'Walleats',
          description: 'Todos mis Walleats',
          url: '/walleats/list',
        },
      ],
    },
  },
  devServer: {
    https: false,
    key: './ssl/localhost-key.pem',
    cert: './ssl/localhost.pem',
  },
}
