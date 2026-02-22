import type { Category, Brand } from '~/types/catalog'

export const useCatalog = () => {
    const categories = ref<Category[]>([
        {
            name: 'Сайдинг',
            image: '/images/catalog/siding.png',
        },
        {
            name: 'Террасная доска',
            image: '/images/catalog/terrace.png',
        },
        {
            name: 'Подоконники',
            image: '/images/catalog/windowsill.png',
        },
        {
            name: 'Экраны декоративные',
            image: '/images/catalog/screen.png',
        },
        {
            name: 'Кровля',
            image: '/images/catalog/roof.png',
        },
        {
            name: 'Все для окон',
            image: '/images/catalog/everything-for-windows.png',
        },
    ])

    const brands = ref<Brand[]>([
        { id: '1', slug: 'nordside', title: 'NordSide', country: 'Финляндия', countryFlag: '🇫🇮' },
        { id: '2', slug: 'alta-profil', title: 'Альта-Профиль', country: 'Россия', countryFlag: '🇷🇺' },
        { id: '3', slug: 'fineber', title: 'FineBer', country: 'Россия', countryFlag: '🇷🇺' },
        { id: '4', slug: 'holzplast', title: 'Хольцпласт', country: 'Германия', countryFlag: '🇩🇪' },
        { id: '5', slug: 'hardplast', title: 'ХардПласт', country: 'Россия', countryFlag: '🇷🇺' },
        { id: '6', slug: 'grand-line', title: 'Grand Line', country: 'Россия', countryFlag: '🇷🇺' },
        { id: '7', slug: 'docke', title: 'Дёке', country: 'Германия', countryFlag: '🇩🇪' },
        { id: '8', slug: 'vox', title: 'VOX', country: 'Польша', countryFlag: '🇵🇱' },
        { id: '9', slug: 'yu-plast', title: 'Ю-Пласт', country: 'Белоруссия', countryFlag: '🇧🇾' },
        { id: '10', slug: 'starke', title: 'Starke', country: 'Россия', countryFlag: '🇷🇺' },
        { id: '11', slug: 'danke', title: 'DANKE', country: 'Украина', countryFlag: '🇺🇦' },
        { id: '12', slug: 'moller', title: 'MЁЛЛЕР', country: 'Германия', countryFlag: '🇩🇪' }
    ])

    return {
        categories,
        brands,
    }
}