// composables/useCatalog.ts
import type { Category, Brand } from '~/types/catalog'
import SidingImage from '~/assets/images/catalog/siding.png'
import TerraceImage from '~/assets/images/catalog/terrace.png'
import WindowSillImage from '~/assets/images/catalog/windowsill.png'
import ScreenImage from '~/assets/images/catalog/screen.png'
import RoofImage from '~/assets/images/catalog/roof.png'
import EveryThingForWindows from '~/assets/images/catalog/everything-for-windows.png'

export const useCatalog = () => {
    const config = useRuntimeConfig()

    // Статические данные (можно заменить на API)
    const categories = ref<Category[]>([
        {
            name: 'Сайдинг',
            image: SidingImage,
        },
        {
            name: 'Террасная доска',
            image: TerraceImage,
        },
        {
            name: 'Подоконники',
            image: WindowSillImage,
        },
        {
            name: 'Экраны декоративные',
            image: ScreenImage,
        },
        {
            name: 'Кровля',
            image: RoofImage,
        },
        {
            name: 'Все для окон',
            image: EveryThingForWindows,
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

    // Поиск по каталогу
    const searchQuery = ref('')

    const filteredCategories = computed(() => {
        if (!searchQuery.value.trim()) return categories.value

        const query = searchQuery.value.toLowerCase()
        return categories.value.filter(cat =>
            cat.title.toLowerCase().includes(query) ||
            cat.description.toLowerCase().includes(query) ||
            cat.subcategories?.some(sub => sub.title.toLowerCase().includes(query))
        )
    })

    const filteredBrands = computed(() => {
        if (!searchQuery.value.trim()) return brands.value

        const query = searchQuery.value.toLowerCase()
        return brands.value.filter(brand =>
            brand.title.toLowerCase().includes(query) ||
            brand.country.toLowerCase().includes(query)
        )
    })

    return {
        categories,
        brands,
        searchQuery,
        filteredCategories,
        filteredBrands
    }
}