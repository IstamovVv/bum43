// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
    rules: {
        // Пример: разрешить console.log (по умолчанию запрещено)
        'no-console': 'off',

        // Пример: игнорировать неиспользуемые переменные (полезно при разработке)
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

        // Пример: отключить требование multiline-ternary
        'style/multiline-ternary': 'off',
    },
})