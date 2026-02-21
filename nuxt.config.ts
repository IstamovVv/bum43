// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
    css: ['~/assets/css/main.css'],

  components: [
      {
          path: '~/components',
          pathPrefix: false,
      },
  ],

  modules: ['@nuxtjs/tailwindcss', '@nuxt/fonts', '@nuxtjs/seo', '@nuxt/image', 'nuxt-security'],
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            title: 'СтройБум Киров',
            meta: [
                { name: 'description', content: 'Строительные материалы в Кирове' }
            ]
        }
    }
})