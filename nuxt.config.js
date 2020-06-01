export default {
    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: '/fonts/icomoon/style.css' },
            { rel: 'stylesheet', href: '/css/jquery-ui.css' },
            { rel: 'stylesheet', href: '/css/jquery.fancybox.min.css' },
            { rel: 'stylesheet', href: '/css/bootstrap-datepicker.css' },
            { rel: 'stylesheet', href: '/fonts/flaticon/font/flaticon.css' },
            { rel: 'stylesheet', href: '/css/aos.css' },
            { rel: 'stylesheet', href: '/css/jquery.mb.YTPlayer.min.css' },
            {
                rel: 'stylesheet',
                href: '/fonts/icomoon/style.css',
                media: 'all',
                type: 'text'
            }
        ],
        script: [
            { src: '/js/jquery-3.3.1.min.js', body: true },
            { src: '/js/jquery-migrate-3.0.1.min.js', body: true },
            { src: '/js/jquery-ui.js', body: true },
            { src: '/js/jquery.stellar.min.js', body: true },
            { src: '/js/jquery.countdown.min.js', body: true },
            { src: '/js/jquery.easing.1.3.js', body: true },
            { src: '/js/aos.js', body: true },
            { src: '/js/jquery.fancybox.min.js', body: true },
            { src: '/js/jquery.sticky.js', body: true },
            { src: '/js/jquery.mb.YTPlayer.min.js', body: true },
            { src: '/js/bootstrap-datepicker.min.js', body: true },
            { src: '/js/main.js', body: true }
        ]

        // bodyAttrs: {
        //     'data-spy': 'scroll',
        //     'data-target': '.site-navbar-target',
        //     'data-offset': '300'
        // }
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#000080', height: '5px' },
    /*
     ** Global CSS
     */
    css: ['@/assets/css/style.css'],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        { src: '@/plugins/owl.js', ssr: false }, // Only works on client sid
        '@/plugins/firebase.js',
        '@/plugins/fireauth.js',
        '~/plugins/loader.js'
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/eslint-module'
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://bootstrap-vue.js.org
        'bootstrap-vue/nuxt',
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/pwa'
        // '@nuxtjs/firebase'
    ],
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {},
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {}
    }
}
