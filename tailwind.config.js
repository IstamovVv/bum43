// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue"
    ],
    theme: {
        extend: {
            // ===== ЦВЕТА =====
            colors: {
                primary: {
                    50: '#eef5ff',
                    100: '#d9e6ff',
                    200: '#c0d6ff',
                    300: '#a0c2ff',
                    400: '#73a8ff',
                    500: '#033975',
                    600: '#022c5c',
                    700: '#02234a',
                    800: '#011a38',
                    900: '#01142a'
                },
                accent: {
                    50: '#fffbeb',
                    100: '#fef3c7',
                    200: '#fde68a',
                    300: '#fcd34d',
                    400: '#fbbf24',
                    500: '#ffd000',
                    600: '#d97706',
                    700: '#b45309',
                    800: '#92400e',
                    900: '#78350f'
                },
                discount: {
                    500: '#ef4444',
                    600: '#dc2626'
                },
                success: {
                    500: '#10b981',
                    600: '#059669'
                }
            },

            // ===== ШРИФТЫ =====
            fontFamily: {
                sans: ['Open Sans', 'sans-serif'],
                heading: ['Montserrat', 'sans-serif']
            },

            // ===== АНИМАЦИИ =====
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in',
                'slide-up': 'slideUp 0.6s ease-out',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'blink': 'blink 1.5s infinite'
            },

            // ===== KEYFRAMES =====
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                },
                blink: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.7' }
                }
            }
        }
    },
    plugins: []
}