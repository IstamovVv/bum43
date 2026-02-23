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

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
    '@nuxtjs/seo',
    '@nuxt/image',
    'nuxt-icon',
    'nuxt-security',
    'vue3-carousel-nuxt',
    'nuxt-easy-lightbox'
  ],
    app: {
        baseURL: '/bum43/',
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            title: 'СтройБум Киров',
            meta: [
                { name: 'description', content: 'Строительные материалы в Кирове' }
            ]
        }
    },
    nitro: {
        prerender: {
            crawlLinks: true,
            failOnError: false, // Не прерывать сборку из-за 404
            // Исключить админку из пререндеринга (она статическая)
            ignore: ['/admin', '/bum43/admin'],
            // Явно указать, какие маршруты генерировать (опционально)
            routes: ['/', '/catalog', '/categories'],
        },
        // Важно для статического хостинга
        static: true,
        // Для GitHub Pages:
        publicAssets: [
            {
                dir: 'public',
                maxAge: 3600,
            },
        ],
    },
    site: {
        // Берём из env-переменной, если нет — дефолтное значение
        url: process.env.NUXT_PUBLIC_SITE_URL || 'https://stroybum.ru',
        name: 'СтройБум Киров',
        description: 'Строительные материалы в Кирове',
        trailingSlash: false, // ← Важно: убирать слэши
    },
})