// composables/useCatalog.ts
import type { Category, Brand } from '~/types/catalog'

export const useCatalog = () => {
    const config = useRuntimeConfig()

    // Статические данные (можно заменить на API)
    const categories = ref<Category[]>([
        {
            id: 'sayding',
            slug: 'sayding',
            title: 'Сайдинг',
            description: 'Виниловый, металлический',
            itemCount: 48,
            priceFrom: '180 ₽',
            icon: '🏠',
            gradient: 'linear-gradient(135deg, #eef5ff 0%, #d9e6ff 100%)',
            subcategories: [
                { id: '1', slug: 'vinilovyy', title: 'Виниловый сайдинг', itemCount: 24 },
                { id: '2', slug: 'metallicheskiy', title: 'Металлический сайдинг', itemCount: 16 },
                { id: '3', slug: 'tsokolnyy', title: 'Цокольный сайдинг', itemCount: 8 }
            ]
        },
        {
            id: 'fasad-paneli',
            slug: 'fasadnyye-paneli',
            title: 'Фасадные панели',
            description: 'Цокольные, декоративные',
            itemCount: 124,
            priceFrom: '450 ₽',
            icon: '🧱',
            gradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            isHot: true,
            subcategories: [
                { id: '4', slug: 'yu-plast', title: 'Ю-Пласт', itemCount: 24 },
                { id: '5', slug: 'fineber', title: 'FineBer', itemCount: 18 },
                { id: '6', slug: 'alta-profil', title: 'Альта-Профиль 🇷🇺', itemCount: 32 },
                { id: '7', slug: 'vox', title: 'VOX 🇵🇱', itemCount: 16 },
                { id: '8', slug: 'docke', title: 'DOCKE 🇩🇪', itemCount: 14 },
                { id: '9', slug: 'starke', title: 'Starke', itemCount: 10 }
            ]
        },
        {
            id: 'vodostok',
            slug: 'vodostok',
            title: 'Водосточные системы',
            description: 'Желоба, трубы, крепления',
            itemCount: 64,
            priceFrom: '102 ₽',
            icon: '💧',
            gradient: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
            subcategories: [
                { id: '10', slug: 'zheloba', title: 'Желоба водосточные', itemCount: 28 },
                { id: '11', slug: 'truby', title: 'Трубы водосточные', itemCount: 22 },
                { id: '12', slug: 'krepleniya', title: 'Крепления', itemCount: 14 }
            ]
        },
        {
            id: 'terrasnaya',
            slug: 'terrasnaya-doska',
            title: 'Террасная доска',
            description: 'ДПК, лиственница, сосна',
            itemCount: 32,
            priceFrom: '450 ₽',
            icon: '🪵',
            gradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            subcategories: [
                { id: '13', slug: 'dpk', title: 'ДПК доска', itemCount: 18 },
                { id: '14', slug: 'listvennica', title: 'Лиственница', itemCount: 10 },
                { id: '15', slug: 'sosna', title: 'Сосна', itemCount: 4 }
            ]
        },
        {
            id: 'okna',
            slug: 'okna',
            title: 'Всё для окон',
            description: 'Подоконники, отливы, крепёж',
            itemCount: 156,
            priceFrom: undefined,
            icon: '🪟',
            gradient: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
            isHot: true,
            subcategories: [
                { id: '16', slug: 'podokonniki', title: 'Подоконники', itemCount: 86 },
                { id: '17', slug: 'otlivy', title: 'Отливы оконные', itemCount: 28 },
                { id: '18', slug: 'sendvich-paneli', title: 'Сэндвич-панели', itemCount: 22 },
                { id: '19', slug: 'montazhnaya-pena', title: 'Монтажная пена', itemCount: 12 },
                { id: '20', slug: 'krepezh', title: 'Крепёж', itemCount: 8 }
            ]
        },
        {
            id: 'zabory',
            slug: 'zabory',
            title: 'Заборы',
            description: 'Сетка-рабица, столбы, ворота',
            itemCount: 42,
            priceFrom: '850 ₽',
            icon: '🚧',
            gradient: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
            subcategories: [
                { id: '21', slug: 'setka-rabica', title: 'Сетка-рабица', itemCount: 18 },
                { id: '22', slug: 'stolby', title: 'Столбы заборные', itemCount: 14 },
                { id: '23', slug: 'vorota', title: 'Ворота и калитки', itemCount: 10 }
            ]
        },
        {
            id: 'krovlya',
            slug: 'krovlya',
            title: 'Кровля',
            description: 'Металлочерепица, профнастил',
            itemCount: 98,
            priceFrom: '350 ₽',
            icon: '🏠',
            gradient: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
            subcategories: [
                { id: '24', slug: 'metallocherepica', title: 'Металлочерепица', itemCount: 52 },
                { id: '25', slug: 'profnastil', title: 'Профнастил', itemCount: 32 },
                { id: '26', slug: 'dobory', title: 'Доборные элементы', itemCount: 14 }
            ]
        },
        {
            id: 'utepliteli',
            slug: 'utepliteli',
            title: 'Утеплители',
            description: 'Минвата, пенопласт, ЭППС',
            itemCount: 56,
            priceFrom: '120 ₽',
            icon: '🔥',
            gradient: 'linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)',
            subcategories: [
                { id: '27', slug: 'minvata', title: 'Минеральная вата', itemCount: 28 },
                { id: '28', slug: 'penoplast', title: 'Пенопласт', itemCount: 18 },
                { id: '29', slug: 'epps', title: 'Экструдированный ППС', itemCount: 10 }
            ]
        }
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