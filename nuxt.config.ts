// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    nitro: {
      preset: 'static',
    },
    app: {
        baseURL: '/bum43/'
    },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
    css: ['~/assets/css/main.css'],

  components: [
      {
          path: '~/components',
          pathPrefix: false,
      },
  ],

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
    '@nuxtjs/seo',
    '@nuxt/image',
    'nuxt-icon',
    'nuxt-security',
    'vue3-carousel-nuxt',
    'nuxt-easy-lightbox',
    '@nuxt/content'
  ],
    experimental: { appManifest: false },
})