/*
 * @Author       : your name
 * @Date         : 2022-03-04 15:08:45
 * @LastEditTime : 2022-03-04 18:03:37
 * @FilePath     : /Jest-Vue/nuxt.config.js
 * @developer    : yangfan36
 */
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Jest-Vue',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  server: {
    port: 1888, // default: 3000
    host: '0.0.0.0' // default: localhost
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['view-design/dist/styles/iview.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/view-ui'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
